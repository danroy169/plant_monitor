import { getTempAndHumid } from './read-temp-humid.js'
import { CONFIG_REQUEST, SECONDS_TO_MILLI, SENSOR_RESPONSE, TEMP_HUMIDITY_SENSOR, TEMP, HUMIDITY, TEMP_SENSOR_SERVICE, MESSAGE } from '../../../util/consts.js'
import isValidMessage from '../../../util/validator.js'
import { parentPort, workerData } from 'worker_threads'

let pollIntervalSeconds = workerData.interval

let intervalID = setInterval(publishTempAndHumid, pollIntervalSeconds * SECONDS_TO_MILLI)

parentPort.on(MESSAGE, msg => {
    console.log('Temp-Sensor Service message recieved. Topic:', msg.topic)

    if (msg.topic === CONFIG_REQUEST && msg.target === TEMP_SENSOR_SERVICE) { setPollInterval(intervalID, msg.data) }
})


async function publishTempAndHumid() {
    const reading = await getTempAndHumid()
    const topic = SENSOR_RESPONSE
    const sensorID = TEMP_HUMIDITY_SENSOR
    const time = new Date().toISOString()
    const temp = reading.temp
    const humidity = reading.humidity
    const currentPollInterval = pollIntervalSeconds

    const tempMessage = {
        topic,
        sensorID,
        time,
        type: TEMP,
        fahrenheit: temp,
        currentPollInterval
    }

    const humidMessage = {
        topic,
        sensorID,
        time,
        type: HUMIDITY,
        percent: humidity,
        currentPollInterval
    }

    if (isValidMessage(tempMessage)) { parentPort.postMessage(tempMessage) }

    if (isValidMessage(humidMessage)) { parentPort.postMessage(humidMessage) }

}

function setPollInterval(intervalID, newInterval) {
    clearInterval(intervalID)

    pollIntervalSeconds = newInterval

    intervalID = setInterval(publishTempAndHumid, newInterval * SECONDS_TO_MILLI)
}