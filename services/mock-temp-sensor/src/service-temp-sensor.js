import { CONFIG_REQUEST, SECONDS_TO_MILLI, SENSOR_RESPONSE, TEMP_HUMIDITY_SENSOR, TEMP, HUMIDITY, CONFIG_RESPONSE, MESSAGE } from '../../../util/consts.js'
import isValidMessage from '../../../util/validator.js'
import { parentPort, workerData } from 'worker_threads'

let pollIntervalSeconds = workerData.interval

let intervalID = setInterval(publishTempAndHumid, pollIntervalSeconds * SECONDS_TO_MILLI)

parentPort.on(MESSAGE, msg => { if (msg.topic === CONFIG_REQUEST) { onConfigRequest(msg) } })

function onConfigRequest(msg){
    intervalID = setPollInterval(msg.data)

    const configResponse = {
        topic: CONFIG_RESPONSE,
        time: new Date().toISOString(),
        id: msg.id
    }

    if(intervalID._idleTimeout === msg.data * SECONDS_TO_MILLI) { configResponse.result = true }
    else { configResponse.result = false }

    parentPort.postMessage(configResponse)
}

function setPollInterval(newInterval) {
    clearInterval(intervalID)

    pollIntervalSeconds = newInterval

    return setInterval(publishTempAndHumid, newInterval * SECONDS_TO_MILLI)
}

async function publishTempAndHumid() {
    const reading = {temp: Math.floor(Math.random() * 100), humidity: Math.floor(Math.random() * 100)}
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
