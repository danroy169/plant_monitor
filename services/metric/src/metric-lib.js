import { TEMP, HUMIDITY, MOISTURE_SENSOR_1, MOISTURE_SENSOR_2, DATA_RESPONSE, ALL, AVERAGE, MOISTURE } from '../../../util/consts.js'
import isValidMessage from '../../../util/validator.js'

export function storeData(msg, dataStore) {

    if (msg.sensorID === MOISTURE_SENSOR_1) { dataStore.moisture1Readings.splice(0, 0, msg) }

    if (msg.sensorID === MOISTURE_SENSOR_2) { dataStore.moisture2Readings.splice(0, 0, msg) }

    if (msg.type === TEMP) { dataStore.tempReadings.splice(0, 0, msg) }

    if (msg.type === HUMIDITY) { dataStore.humidReadings.splice(0, 0, msg) }
}

export function onDataRequest(msg, dataStore) {

    const dataResponseMessage = {
        topic: DATA_RESPONSE,
        metric: msg.metric,
        time: new Date().toISOString(),
        id: msg.id
    }

    if (msg.numberOfReadings === ALL) {

        dataResponseMessage.result = onAll(msg, dataStore)

        if (isValidMessage(dataResponseMessage)) { return dataResponseMessage }
    }

    if (msg.numberOfReadings === AVERAGE) {
        dataResponseMessage.result = [getDailyAverageReading(msg, dataStore)]

        if (isValidMessage(dataResponseMessage)) { return dataResponseMessage }
    }

    if (msg.numberOfReadings === 'minMax') {

        dataResponseMessage.result = [getMinMax(msg, dataStore)]

        if (isValidMessage(dataResponseMessage)) { return dataResponseMessage }
    }

    if (msg.metric === MOISTURE_SENSOR_1) { dataResponseMessage.result = dataStore.moisture1Readings.slice(0, msg.numberOfReadings) }

    if (msg.metric === MOISTURE_SENSOR_2) { dataResponseMessage.result = dataStore.moisture2Readings.slice(0, msg.numberOfReadings) }

    if (msg.metric === TEMP) { dataResponseMessage.result = dataStore.tempReadings.slice(0, msg.numberOfReadings) }

    if (msg.metric === HUMIDITY) { dataResponseMessage.result = dataStore.humidReadings.slice(0, msg.numberOfReadings) }

    if (isValidMessage(dataResponseMessage)) { return dataResponseMessage }

    return false
}

export function onAll(msg, dataStore) {
    if (msg.metric === MOISTURE_SENSOR_1) { return dataStore.moisture1Readings }

    if (msg.metric === MOISTURE_SENSOR_2) { return dataStore.moisture2Readings }

    if (msg.metric === TEMP) { return dataStore.tempReadings }

    if (msg.metric === HUMIDITY) { return dataStore.humidReadings }
}

export function getDailyAverageReading(msg, dataStore) {

    const todayReadings = onAll(msg, dataStore).filter(checkDate)

    const todayTotal = readingsToJustNums(todayReadings).reduce((prev, curr) => prev + curr)

    return todayTotal / todayReadings.length
}

export function checkDate(reading) {
    const today = new Date().toDateString()
    return today === new Date(reading.time).toDateString()
}

export function getMinMax(msg, dataStore) {

    const allReadings = onAll(msg, dataStore)

    const justNums = readingsToJustNums(allReadings)

    const max = Math.max(...justNums)

    const min = Math.min(...justNums)

    return { min, max }
}


function readingsToJustNums(allReadings) {
    return allReadings.map(reading => {
        if (reading.type === MOISTURE) { return reading.moistureLevel }

        if (reading.type === TEMP) { return reading.fahrenheit }

        if (reading.type === HUMIDITY) { return reading.percent }
    })
}