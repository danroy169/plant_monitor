import { parentPort } from 'worker_threads'
import { SENSOR_RESPONSE, MOISTURE, TEMP, HUMIDITY, MESSAGE, MOISTURE_SENSOR_1, MOISTURE_SENSOR_2, TEMP_HUMIDITY_SENSOR, DATA_REQUEST, DATA_RESPONSE } from '../../../util/consts.js'
import isValidMessage from '../../../util/validator.js'
//import { DATA_REQUEST, DATA_RESPONSE, SENSOR_RESPONSE, URL, MOISTURE, TEMP, HUMIDITY } from "/home/pi/Projects/Plant Monitor/js/consts.js"


const dataStore = {
    moisture1Readings: [],
    moisture2Readings: [],
    tempReadings: [],
    humidReadings: []
}


parentPort.on(MESSAGE, msg => { 
    console.log('Metric service recieved', msg.topic, 'message\n')

    if (msg.topic === SENSOR_RESPONSE) { storeData(msg) } 
    if (msg.topic === DATA_REQUEST) { onDataRequest(msg) }
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

function onDataRequest(msg){
    let result

    if(msg.metric === MOISTURE_SENSOR_1) { result = dataStore.moisture1Readings.splice(dataStore.moisture1Readings.length - msg.numberOfReadings)}
    if(msg.metric === MOISTURE_SENSOR_2) { result = dataStore.moisture2Readings.splice(dataStore.moisture2Readings.length - msg.numberOfReadings)}
    if(msg.metric === TEMP) { result = dataStore.tempReadings.splice(dataStore.tempReadings.length - msg.numberOfReadings)}
    if(msg.metric === HUMIDITY) { result = dataStore.humidReadings.splice(dataStore.humidReadings.length - msg.numberOfReadings)}

    const dataResponseMessage = {
        topic: DATA_RESPONSE,
        metric: msg.metric,
        result,
        time: new Date().toISOString()
    }

    if (isValidMessage(dataResponseMessage)) { parentPort.postMessage(dataResponseMessage) }
    else(console.log('invalid message'))
}

