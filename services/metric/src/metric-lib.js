import { TEMP, HUMIDITY, MOISTURE_SENSOR_1, MOISTURE_SENSOR_2, DATA_RESPONSE, ALL } from '../../../util/consts.js'
import isValidMessage from '../../../util/validator.js'

export function storeData(msg, dataStore) {

    if (msg.sensorID === MOISTURE_SENSOR_1) { dataStore.moisture1Readings.push(msg) }

    if (msg.sensorID === MOISTURE_SENSOR_2) { dataStore.moisture2Readings.push(msg) }

    if (msg.type === TEMP) { dataStore.tempReadings.push(msg) }

    if (msg.type === HUMIDITY) { dataStore.humidReadings.push(msg) }

}

export function onDataRequest(msg, dataStore) {
    let result

    if(msg.numberOfReadings === ALL) { msg.numberOfReadings = convertAllToLength(msg, dataStore) }

    if (msg.metric === MOISTURE_SENSOR_1) { result = dataStore.moisture1Readings.splice(dataStore.moisture1Readings.length - msg.numberOfReadings) }

    if (msg.metric === MOISTURE_SENSOR_2) { result = dataStore.moisture2Readings.splice(dataStore.moisture2Readings.length - msg.numberOfReadings) }

    if (msg.metric === TEMP) { result = dataStore.tempReadings.splice(dataStore.tempReadings.length - msg.numberOfReadings) }

    if (msg.metric === HUMIDITY) { result = dataStore.humidReadings.splice(dataStore.humidReadings.length - msg.numberOfReadings) }

    const dataResponseMessage = {
        topic: DATA_RESPONSE,
        metric: msg.metric,
        result,
        time: new Date().toISOString()
    }
    
    if (isValidMessage(dataResponseMessage)) { return dataResponseMessage }
    
    return false
}

export function convertAllToLength(msg, dataStore) {
    if (msg.metric === MOISTURE_SENSOR_1) { return dataStore.moisture1Readings.length }

    if (msg.metric === MOISTURE_SENSOR_2) { return dataStore.moisture2Readings.length }

    if (msg.metric === TEMP) { return dataStore.tempReadings.length }

    if (msg.metric === HUMIDITY) { return dataStore.humidReadings.length }
}