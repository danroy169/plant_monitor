// import { getMoisture } from './read-moisture-sensor.js'
import { CONFIG_REQUEST, MOISTURE, MOISTURE_SENSOR_1, SECONDS_TO_MILLI, SENSOR_REQUEST, SENSOR_RESPONSE } from '../../../util/consts.js'
import isValidMessage from '../../../util/validator.js'
import { parentPort, workerData } from 'worker_threads'


let pollIntervalSeconds = workerData.interval


let intervalID = setInterval(publishMoisture, pollIntervalSeconds * SECONDS_TO_MILLI)


parentPort.on('message', msg => {
    console.log('Sensor Service message recieved. Topic:', msg.topic)

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
    const moistureLevel = 100 //await getMoisture()
    const currentPollInterval = pollIntervalSeconds

    const reading = {
        topic,
        sensorID,
        time,
        type,
        moistureLevel,
        currentPollInterval
    }

    if(isValidMessage(reading)) { parentPort.postMessage(reading) }

}

