import { connect } from "async-mqtt"
import { DATA_REQUEST, DATA_RESPONSE, SENSOR_RESPONSE, URL, MOISTURE, TEMP, HUMIDITY } from "./consts.js"

const client = connect(URL);

let moistureReadings = []
let tempReadings = []
let humidReadings = []

client.on("connect", () => {
    console.log("connected")
    client.subscribe([DATA_REQUEST, SENSOR_RESPONSE])
});

client.on("message", (topic, message, packet) => {
    let obj = JSON.parse(message.toString())

    if(obj.type === MOISTURE)  {moistureReadings.push(obj)}
    if(obj.type === TEMP)  {tempReadings.push(obj)}
    if(obj.type === HUMIDITY)  {humidReadings.push(obj)}

    console.log(moistureReadings)
})
