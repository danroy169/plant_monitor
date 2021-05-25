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

        const threshold = isAThresholdViolation(msg, workerData)
        const thresholdViolationMessage = convertToThresholdViolationMessage(msg, threshold)

        if(isValidMessage(thresholdViolationMessage)) { return thresholdViolationMessage }
    }
    
    return false
}


export function isAThresholdViolation(msg, workerData){

    if(msg.type === MOISTURE && msg.moistureLevel < workerData.moistureLow) { return workerData.moistureLow } 

    if(msg.type === TEMP){
        if(msg.fahrenheit > workerData.tempHigh) { return workerData.tempHigh }
        if(msg.fahrenheit < workerData.tempLow) { return workerData.tempLow }
    }

    if(msg.type === HUMIDITY){
        if(msg.percent > workerData.humidHigh) { return workerData.humidHigh }
        if(msg.percent < workerData.humidLow) { return workerData.humidLow }
    } 

    return false
}

export function convertToThresholdViolationMessage(msg, threshold){
    
    const thresholdViolationMessage = {
        topic: THRESHOLD_VIOLATION,
        sensorID: msg.sensorID,
        violationType: msg.type,
        threshold: threshold
    }

    if(msg.type === MOISTURE) { thresholdViolationMessage.currentLevel = msg.moistureLevel }
    if(msg.type === TEMP) { thresholdViolationMessage.currentLevel = msg.fahrenheit }
    if(msg.type === HUMIDITY) { thresholdViolationMessage.currentLevel = msg.percent }

    thresholdViolationMessage.time = msg.time
    
    if(isValidMessage(thresholdViolationMessage)) { return thresholdViolationMessage }
}