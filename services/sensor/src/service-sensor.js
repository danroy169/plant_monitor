
import { connect } from "async-mqtt"
//import { getMoisture } from "./read-sensor.js"
import { URL, MOISTURE, TEMP, HUMIDITY, MOISTURE_SENSOR_1, SECONDS_TO_MILLI, SENSOR_REQUEST, CONFIG_REQUEST, SENSOR_RESPONSE, CONFIG_RESPONSE, SENSOR_SERVICE } from "../../../src/consts.js"
// import { URL, MOISTURE, TEMP, HUMIDITY, MOISTURE_SENSOR_1, SECONDS_TO_MILLI, SENSOR_REQUEST, CONFIG_REQUEST, SENSOR_RESPONSE, CONFIG_RESPONSE, POLL_INTERVAL } from "/home/pi/Projects/Plant Monitor/js/consts.js"

let pollIntervalSeconds = 5

const client = connect(URL);

client.on("connect", init);

async function init(){
    console.log("sensor service connected")

    await client.subscribe([SENSOR_REQUEST, CONFIG_REQUEST])

    let intervalID = setInterval(publishMoisture, pollIntervalSeconds * SECONDS_TO_MILLI)

    client.on("message", (topic, payload, packet) => {
        const messageObject = JSON.parse(payload.toString());

        if (topic === CONFIG_REQUEST && messageObject.target === SENSOR_SERVICE) { setPollInterval(intervalID, messageObject.data) }
    })
}

function setPollInterval(intervalID, newInterval){
    clearInterval(intervalID)
    pollIntervalSeconds = newInterval
    intervalID = setInterval(publishMoisture, pollIntervalSeconds * SECONDS_TO_MILLI)
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


