import { connect } from 'async-mqtt'
//import { getMoisture } from "./read-sensor.js"
import { URL, MOISTURE, MOISTURE_SENSOR_1, SECONDS_TO_MILLI, SENSOR_REQUEST, CONFIG_REQUEST, SENSOR_RESPONSE, CONFIG_RESPONSE, SENSOR_SERVICE } from '../../../src/consts.js'
// import { URL, MOISTURE, TEMP, HUMIDITY, MOISTURE_SENSOR_1, SECONDS_TO_MILLI, SENSOR_REQUEST, CONFIG_REQUEST, SENSOR_RESPONSE, CONFIG_RESPONSE, POLL_INTERVAL } from "/home/pi/Projects/Plant Monitor/js/consts.js"

let pollIntervalSeconds = 5

const client = connect(URL);

const subscribesTo = [SENSOR_REQUEST, CONFIG_REQUEST]

client.on('connect', init);

async function init() {
    console.log('sensor service connected')

    await client.subscribe(subscribesTo)

    let intervalID = setInterval(publishMoisture, pollIntervalSeconds * SECONDS_TO_MILLI)

    client.on('message', (topic, payload) => {
        if (subscribesTo.includes(topic)) { console.log('Sensor service recieved', topic, 'message') }

        const messageObject = JSON.parse(payload.toString());

        if (topic === CONFIG_REQUEST && messageObject.target === SENSOR_SERVICE) { setPollInterval(intervalID, messageObject.data) }
    })
}

async function setPollInterval(intervalID, newInterval) {
    clearInterval(intervalID)

    pollIntervalSeconds = newInterval

    intervalID = setInterval(publishMoisture, pollIntervalSeconds * SECONDS_TO_MILLI)

    if (newInterval === pollIntervalSeconds) { await publishConfigResponse(true) }
    else { await publishConfigResponse(false) }
}

async function publishMoisture() {

    const sensorID = MOISTURE_SENSOR_1
    const time = new Date().toISOString()
    const type = MOISTURE
    const moistureLevel = 200 //await getMoisture();
    const currentPollInterval = pollIntervalSeconds

    const reading = {
        sensorID,
        time,
        type,
        moistureLevel,
        currentPollInterval
    }

    const payload = JSON.stringify(reading)

    await client.publish(SENSOR_RESPONSE, payload)
}

async function publishConfigResponse(result) {
    const message = {
        target: SENSOR_SERVICE,
        result,
        time: new Date().toISOString()
    }

    const payload = JSON.stringify(message)

    await client.publish(CONFIG_RESPONSE, payload)
}
