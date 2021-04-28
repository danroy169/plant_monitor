//import { getMoisture } from "./read-sensor.js"
import { URL, MOISTURE, MOISTURE_SENSOR_1, SECONDS_TO_MILLI, SENSOR_REQUEST, CONFIG_REQUEST, SENSOR_RESPONSE, CONFIG_RESPONSE, SENSOR_SERVICE } from '../src/consts.js'
// import { URL, MOISTURE, TEMP, HUMIDITY, MOISTURE_SENSOR_1, SECONDS_TO_MILLI, SENSOR_REQUEST, CONFIG_REQUEST, SENSOR_RESPONSE, CONFIG_RESPONSE, POLL_INTERVAL } from "/home/pi/Projects/Plant Monitor/js/consts.js"

import { Worker, parentPort, workerData } from 'worker_threads'


let pollIntervalSeconds = workerData.interval


let intervalID = setInterval(publishMoisture, pollIntervalSeconds * SECONDS_TO_MILLI)


parentPort.on('message', msg => {
    console.log('message recieved', msg)
    if (msg.interval) { setPollInterval(intervalID, msg.interval) }
})

parentPort.postMessage('message from worker')

function setPollInterval(intervalID, newInterval) {
    clearInterval(intervalID)

    pollIntervalSeconds = newInterval

    intervalID = setInterval(publishMoisture, newInterval * SECONDS_TO_MILLI)
}

function publishMoisture() {
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

    parentPort.postMessage(reading)
    console.log(reading)
}

// async function publishConfigResponse(result) {
//     const message = {
//         target: SENSOR_SERVICE,
//         result,
//         time: new Date().toISOString()
//     }

//     const payload = JSON.stringify(message)

//     await client.publish(CONFIG_RESPONSE, payload)
// }

// async function onSensorRequest(message){
//     if(message.type === MOISTURE) { publishMoisture() }
// }