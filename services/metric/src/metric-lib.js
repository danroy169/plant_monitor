import { MOISTURE, TEMP, HUMIDITY, MOISTURE_SENSOR_1, MOISTURE_SENSOR_2, TEMP_HUMIDITY_SENSOR, DATA_RESPONSE } from '../../../util/consts.js'
import isValidMessage from '../../../util/validator.js'

export function storeData(msg, dataStore) {
    if (msg.type === MOISTURE) {
        if (msg.sensorID === MOISTURE_SENSOR_1) { dataStore.moisture1Readings.push(msg) }

        if (msg.sensorID === MOISTURE_SENSOR_2) { dataStore.moisture1Readings.push(msg) }
    }

    if (msg.sensorID === TEMP_HUMIDITY_SENSOR) {
        if (msg.type === TEMP) { dataStore.tempReadings.push(msg) }

        if (msg.type === HUMIDITY) { dataStore.humidReadings.push(msg) }
    }
}

export function onDataRequest(msg, dataStore){
    let result

    if(msg.metric === MOISTURE_SENSOR_1) { result = dataStore.moisture1Readings.splice(dataStore.moisture1Readings.length - msg.numberOfReadings) }
    if(msg.metric === MOISTURE_SENSOR_2) { result = dataStore.moisture2Readings.splice(dataStore.moisture2Readings.length - msg.numberOfReadings) }
    if(msg.metric === TEMP) { result = dataStore.tempReadings.splice(dataStore.tempReadings.length - msg.numberOfReadings) }
    if(msg.metric === HUMIDITY) { result = dataStore.humidReadings.splice(dataStore.humidReadings.length - msg.numberOfReadings) }

    const dataResponseMessage = {
        topic: DATA_RESPONSE,
        metric: msg.metric,
        result,
        time: new Date().toISOString()
    }

    if (isValidMessage(dataResponseMessage)) { return dataResponseMessage }
    return false
}