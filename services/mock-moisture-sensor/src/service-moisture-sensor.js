import { CONFIG_REQUEST, MOISTURE, MOISTURE_SENSOR_1, SECONDS_TO_MILLI, SENSOR_REQUEST, SENSOR_RESPONSE, SENSOR1_I2C_ADDRESS, SENSOR1_I2C_BUS_NUMBER, SENSOR2_I2C_ADDRESS, SENSOR2_I2C_BUS_NUMBER, MOISTURE_SENSOR_2, CONFIG_RESPONSE, MESSAGE } from '../../../util/consts.js'
import isValidMessage from '../../../util/validator.js'
import { parentPort, workerData } from 'worker_threads'

let pollIntervalSeconds = workerData.interval

let intervalID = setInterval(publishMoisture, pollIntervalSeconds * SECONDS_TO_MILLI)

parentPort.on(MESSAGE, msg => {

    if(msg.topic === SENSOR_REQUEST) { publishMoisture() }

    if(msg.topic === CONFIG_REQUEST) { onConfigRequest(msg, intervalID) }
})

function onConfigRequest(msg, intervalID){
    setPollInterval(intervalID, msg.data)

    const configResponse = {
        topic: CONFIG_RESPONSE,
        time: new Date().toISOString(),
        id: msg.id
    }

    if(pollIntervalSeconds === msg.data) { configResponse.result = true }
    else { configResponse.result = false }

    parentPort.postMessage(configResponse)
}

function setPollInterval(intervalID, newInterval) {
    clearInterval(intervalID)

    pollIntervalSeconds = newInterval

    intervalID = setInterval(publishMoisture, newInterval * SECONDS_TO_MILLI)
}

async function publishMoisture() {
    const topic = SENSOR_RESPONSE
    const sensorID = MOISTURE_SENSOR_1
    const time = new Date().toISOString()
    const type = MOISTURE
    const moistureLevel = Math.floor(Math.random() * 1000)
    const moistureLevel2 = Math.floor(Math.random() * 1000)
    const currentPollInterval = pollIntervalSeconds

    const reading1 = {
        topic,
        sensorID,
        time,
        type,
        moistureLevel,
        currentPollInterval
    }

    const reading2 = {
        topic,
        sensorID: MOISTURE_SENSOR_2,
        time,
        type,
        moistureLevel: moistureLevel2,
        currentPollInterval
    }
    

    if(isValidMessage(reading1)) { parentPort.postMessage(reading1) }
    if(isValidMessage(reading2)) { parentPort.postMessage(reading2) }

}

