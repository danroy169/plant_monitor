import { parentPort, workerData } from 'worker_threads'
import { THRESHOLD_VIOLATION, MOISTURE, TEMP, HUMIDITY, SENSOR_RESPONSE, CONFIG_REQUEST, MOISTURE_LOW, TEMP_LOW, TEMP_HIGH, HUMID_LOW, HUMID_HIGH } from '../../../util/consts.js'
import isValidMessage  from '../../../util/validator.js'
// import { THRESHOLD_VIOLATION, CONFIG_REQUEST, CONFIG_RESPONSE, SENSOR_RESPONSE, MOISTURE, TEMP, HUMIDITY, URL, EMAIL_REQUEST } from "/home/pi/Projects/Plant Monitor/js/consts.js"

let moistureLow = workerData.moistureLow

let tempLow = workerData.tempLow
let tempHigh = workerData.tempHigh

let humidLow = workerData.humidLow
let humidHigh = workerData.humidHigh

parentPort.on('message', msg => {
    if(msg.topic === SENSOR_RESPONSE) {console.log('threshold service recieved sensor response message\n'); onSensorResponse(msg)}
    if(msg.topic === CONFIG_REQUEST) {console.log('threshold service recieved config-request message\n'); onConfigRequest(msg)}
})

function onConfigRequest(msg){
    if(msg.setting === MOISTURE_LOW) { moistureLow = msg.data }

    if(msg.setting === TEMP_LOW) { tempLow = msg.data }
    if(msg.setting === TEMP_HIGH) { tempHigh = msg.data }

    if(msg.setting === HUMID_LOW) { humidLow = msg.data }
    if(msg.setting === HUMID_HIGH) { humidHigh = msg.data }
}


function onSensorResponse(msg){
    if(isAThresholdViolation(msg)) {
        console.log('Threshold violation detected!\n')

        const threshold = isAThresholdViolation(msg)
        const thresholdViolationMessage = convertToThresholdViolation(msg, threshold)

        if(isValidMessage(thresholdViolationMessage)) { parentPort.postMessage(thresholdViolationMessage) }
    }
}


function isAThresholdViolation(obj){

    if(obj.type === MOISTURE && obj.moistureLevel < moistureLow) {return moistureLow} 

    if(obj.type === TEMP){
        if(obj.fahrenheit > tempHigh) {return tempHigh}
        if(obj.fahrenheit < tempLow) {return tempLow}
    }

    if(obj.type === HUMIDITY){
        if(obj.percent > humidHigh) {return humidHigh}
        if(obj.percent < humidLow) {return humidLow}
    } 

    return false
}

function convertToThresholdViolation(obj, threshold){
    
    const thresholdViolationMessage = {
        topic: THRESHOLD_VIOLATION,
        sensorID: obj.sensorID,
        violationType: obj.type,
        threshold: threshold
    }

    if(obj.type === MOISTURE) {thresholdViolationMessage.currentLevel = obj.moistureLevel}
    if(obj.type === TEMP) {thresholdViolationMessage.currentLevel = obj.fahrenheit}
    if(obj.type === HUMIDITY) {thresholdViolationMessage.currentLevel = obj.percent}

    thresholdViolationMessage.time = obj.time

    return thresholdViolationMessage
}