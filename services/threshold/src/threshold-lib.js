import { THRESHOLD_VIOLATION, MOISTURE, TEMP, HUMIDITY, MOISTURE_LOW, TEMP_LOW, TEMP_HIGH, HUMID_LOW, HUMID_HIGH } from '../../../util/consts.js'
import isValidMessage from '../../../util/validator.js'

export function onConfigRequest(msg, workerData){
    if(msg.setting === MOISTURE_LOW) { workerData.moistureLow = msg.data }

    if(msg.setting === TEMP_LOW) { workerData.tempLow = msg.data }
    if(msg.setting === TEMP_HIGH) { workerData.tempHigh = msg.data }

    if(msg.setting === HUMID_LOW) { workerData.humidLow = msg.data }
    if(msg.setting === HUMID_HIGH) { workerData.humidHigh = msg.data }
}


export function onSensorResponse(msg, workerData){
    if(isAThresholdViolation(msg, workerData)) {
        console.log('Threshold violation detected!\n')

        const threshold = isAThresholdViolation(msg, workerData)
        const thresholdViolationMessage = convertToThresholdViolation(msg, threshold)

        if(isValidMessage(thresholdViolationMessage)) { return thresholdViolationMessage }
    }
    return false
}


function isAThresholdViolation(obj, workerData){

    if(obj.type === MOISTURE && obj.moistureLevel < workerData.moistureLow) { return workerData.moistureLow } 

    if(obj.type === TEMP){
        if(obj.fahrenheit > workerData.tempHigh) { return workerData.tempHigh }
        if(obj.fahrenheit < workerData.tempLow) { return workerData.tempLow }
    }

    if(obj.type === HUMIDITY){
        if(obj.percent > workerData.humidHigh) { return workerData.humidHigh }
        if(obj.percent < workerData.humidLow) { return workerData.humidLow }
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

    if(obj.type === MOISTURE) { thresholdViolationMessage.currentLevel = obj.moistureLevel }
    if(obj.type === TEMP) { thresholdViolationMessage.currentLevel = obj.fahrenheit }
    if(obj.type === HUMIDITY) { thresholdViolationMessage.currentLevel = obj.percent }

    thresholdViolationMessage.time = obj.time

    return thresholdViolationMessage
}