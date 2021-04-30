import { parentPort } from 'worker_threads'
import { SENSOR_RESPONSE, MOISTURE, TEMP, HUMIDITY, MESSAGE, MOISTURE_SENSOR_1, MOISTURE_SENSOR_2, TEMP_HUMIDITY_SENSOR } from '../../../util/consts.js'
//import { DATA_REQUEST, DATA_RESPONSE, SENSOR_RESPONSE, URL, MOISTURE, TEMP, HUMIDITY } from "/home/pi/Projects/Plant Monitor/js/consts.js"


const dataStore = {
    moisture1Readings: [],
    moisture2Readings: [],
    tempReadings: [],
    humidReadings: []
}


parentPort.on(MESSAGE, msg => {
    if (msg.topic === SENSOR_RESPONSE) { console.log('Metric service recieved sensor response message\n'); storeData(msg)}
})


function storeData(msg) {
    if (msg.type === MOISTURE) {
        if (msg.sensorID === MOISTURE_SENSOR_1) { dataStore.moisture1Readings.push(msg) }

        if (msg.sensorID === MOISTURE_SENSOR_2) { dataStore.moisture1Readings.push(msg) }
    }

    if (msg.sensorID === TEMP_HUMIDITY_SENSOR) {
        if (msg.type === TEMP) { dataStore.tempReadings.push(msg) }

        if (msg.type === HUMIDITY) { dataStore.humidReadings.push(msg) }
    }
}

