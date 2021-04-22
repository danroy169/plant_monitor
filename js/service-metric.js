import { connect } from "async-mqtt"
// import { DATA_REQUEST, DATA_RESPONSE, SENSOR_RESPONSE, URL, MOISTURE, TEMP, HUMIDITY } from "./consts.js"
import { DATA_REQUEST, DATA_RESPONSE, SENSOR_RESPONSE, URL, MOISTURE, TEMP, HUMIDITY } from "/home/pi/Projects/Plant Monitor/js/consts.js"

const client = connect(URL);

const dataStore = {
    moistureReadings: [],
    tempReadings: [],
    humidReadings: []
}


client.on("connect", () => {
    console.log("metric service connected")
    client.subscribe([DATA_REQUEST, SENSOR_RESPONSE])
});

// client.on("message", (topic, message, packet) => {
//     let obj = JSON.parse(message.toString())

//     if(obj.type === MOISTURE)  {dataStore.moistureReadings.push(obj)}
//     if(obj.type === TEMP)  {dataStore.tempReadings.push(obj)}
//     if(obj.type === HUMIDITY)  {dataStore.humidReadings.push(obj)}

//     console.log(dataStore.moistureReadings)
// })
