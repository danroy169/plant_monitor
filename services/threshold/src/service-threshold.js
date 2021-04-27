import { connect } from "async-mqtt"
import { THRESHOLD_VIOLATION, CONFIG_REQUEST, SENSOR_RESPONSE, MOISTURE, TEMP, HUMIDITY, URL, } from "../../../src/consts.js"
// import { THRESHOLD_VIOLATION, CONFIG_REQUEST, CONFIG_RESPONSE, SENSOR_RESPONSE, MOISTURE, TEMP, HUMIDITY, URL, EMAIL_REQUEST } from "/home/pi/Projects/Plant Monitor/js/consts.js"

const subscribesTo = [CONFIG_REQUEST, SENSOR_RESPONSE]

let moistureLow = 300
let moistureHigh = 1200

let tempLow = 60
let tempHigh = 85

let humidLow = 30
let humidHigh = 70

const client = connect(URL);

client.on("connect", init);

async function init() {
    console.log("threshold service connected")

    await client.subscribe(subscribesTo)

    client.on("message", (topic, payload) => {
        if(subscribesTo.includes(topic)) { console.log("Threshold service recieved", topic, "message")}

        if(topic === SENSOR_RESPONSE) {onSensorResponse(payload)}
    })
}

async function onSensorResponse(payload){
    const obj = JSON.parse(payload.toString())

    if(isAThresholdViolation(obj)) {
        console.log("Threshold violation detected!")

        const threshold = isAThresholdViolation(obj)
        const thresholdViolationMessage = convertToThresholdViolation(obj, threshold);

        await client.publish(THRESHOLD_VIOLATION, thresholdViolationMessage)
    }
}


function isAThresholdViolation(obj){

    if(obj.type === MOISTURE){
        if (obj.moistureLevel > moistureHigh) {return moistureHigh}
        if (obj.moistureLevel < moistureLow) {return moistureLow}
    } 

    if(obj.type === TEMP){
        if(obj.fahrenheit > tempHigh) {return tempHigh}
        if(obj.fahrenheit < tempLow){return tempLow}
    }

    if(obj.type === HUMIDITY){
        if(obj.percent > humidHigh) {return humidHigh}
        if(obj.percent < humidLow) {return humidLow}
    } 

    return false;
}

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