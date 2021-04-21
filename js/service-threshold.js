import { connect } from "async-mqtt"
import { THRESHOLD_VIOLATION, CONFIG_REQUEST, CONFIG_RESPONSE, SENSOR_RESPONSE, MOISTURE, TEMP, HUMIDITY, URL, EMAIL_REQUEST } from "./consts.js"

let moisture_low = 300
let moisture_high = 1200

let temp_low = 60
let temp_high = 85

let humid_low = 30
let humid_high = 70

const client = connect(URL);

client.on("connect", () => {
    console.log("connected")
    client.subscribe([CONFIG_REQUEST, SENSOR_RESPONSE])
});

client.on("message", (topic, message, packet) => {
    if(topic === SENSOR_RESPONSE) {
        const obj = JSON.parse(message.toString())

        if(isAThresholdViolation(obj)) {
            console.log("Threshold violation detected!")
            const threshold = isAThresholdViolation(obj)
            const thresholdViolationMessage = convertToThresholdViolation(obj, threshold);

            client.publish(THRESHOLD_VIOLATION, thresholdViolationMessage)
        }
    }
})

function convertToThresholdViolation(obj, threshold){
    
    const thresholdViolationMessage = {
        sensorID: obj.sensorID,
        violationType: obj.type,
        threshold: threshold,
    }

    if(obj.type === MOISTURE) {thresholdViolationMessage.currentLevel = obj.moistureLevel}
    if(obj.type === TEMP) {thresholdViolationMessage.currentLevel = obj.fahrenheit}
    if(obj.type === HUMIDITY) {thresholdViolationMessage.currentLevel = obj.percent}

    thresholdViolationMessage.time = obj.time

    return JSON.stringify(thresholdViolationMessage)
}

function isAThresholdViolation(obj){

    if(obj.type === MOISTURE){
        if (obj.moistureLevel > moisture_high) {return moisture_high}
        if (obj.moistureLevel < moisture_low) {return moisture_low}
    } 

    if(obj.type === TEMP){
        if(obj.fahrenheit > temp_high) {return temp_high}
        if(obj.fahrenheit > temp_high || obj.fahrenheit < temp_low){return temp_low}
    }

    if(obj.type === HUMIDITY){
        if(obj.percent > humid_high) {return humid_high}
        if(obj.percent < humid_low) {return humid_low}
    } 

    return false;
}