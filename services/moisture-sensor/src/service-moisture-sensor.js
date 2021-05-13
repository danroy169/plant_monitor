// import { getMoisture } from './read-moisture-sensor.js'
import { CONFIG_REQUEST, MOISTURE, MOISTURE_SENSOR_1, SECONDS_TO_MILLI, SENSOR_REQUEST, SENSOR_RESPONSE, SENSOR1_I2C_ADDRESS, SENSOR1_I2C_BUS_NUMBER, SENSOR2_I2C_ADDRESS, SENSOR2_I2C_BUS_NUMBER, MOISTURE_SENSOR_2 } from '../../../util/consts.js'
import isValidMessage from '../../../util/validator.js'
import { getMoisture } from './read-moisture-sensor.js'
import { parentPort, workerData } from 'worker_threads'

let pollIntervalSeconds = workerData.interval

let intervalID = setInterval(publishMoisture, pollIntervalSeconds * SECONDS_TO_MILLI)

parentPort.on('message', msg => {
    // console.log('Moisture Sensor Service message recieved. Topic:', msg.topic)

    if(msg.topic === SENSOR_REQUEST) { publishMoisture() }

    if(msg.topic === CONFIG_REQUEST) { setPollInterval(intervalID, msg.data) }
})

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
    const moistureLevel = await getMoisture(SENSOR1_I2C_ADDRESS, SENSOR1_I2C_BUS_NUMBER)
    const moistureLevel2 = await getMoisture(SENSOR2_I2C_ADDRESS, SENSOR2_I2C_BUS_NUMBER) 
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

