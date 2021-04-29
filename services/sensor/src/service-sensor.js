//import { getMoisture } from "./read-sensor.js"
import { MOISTURE, MOISTURE_SENSOR_1, SECONDS_TO_MILLI, SENSOR_RESPONSE } from '../../../util/consts.js'
// import { URL, MOISTURE, TEMP, HUMIDITY, MOISTURE_SENSOR_1, SECONDS_TO_MILLI, SENSOR_REQUEST, CONFIG_REQUEST, SENSOR_RESPONSE, CONFIG_RESPONSE, POLL_INTERVAL } from "/home/pi/Projects/Plant Monitor/js/consts.js"
import isValidMessage  from '../../../util/validator.js'

import { parentPort, workerData } from 'worker_threads'


let pollIntervalSeconds = workerData.interval


let intervalID = setInterval(publishMoisture, pollIntervalSeconds * SECONDS_TO_MILLI)


parentPort.on('message', msg => {
    console.log('worker1 message recieved', msg)
})

function setPollInterval(intervalID, newInterval) {
    clearInterval(intervalID)

    pollIntervalSeconds = newInterval

    intervalID = setInterval(publishMoisture, newInterval * SECONDS_TO_MILLI)
}

function publishMoisture() {
    const topic = SENSOR_RESPONSE
    const sensorID = MOISTURE_SENSOR_1
    const time = new Date().toISOString()
    const type = MOISTURE
    const moistureLevel = 200 //await getMoisture();
    const currentPollInterval = pollIntervalSeconds

    const reading = {
        topic,
        sensorID,
        time,
        type,
        moistureLevel,
        currentPollInterval
    }

    if(isValidMessage(reading)) {parentPort.postMessage(reading)}
    
    //console.log(reading)
}

