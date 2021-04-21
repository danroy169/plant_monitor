import { connect } from "async-mqtt"
import { DATA_REQUEST, DATA_RESPONSE, SENSOR_RESPONSE, URL } from "./consts.js"

const client = connect(URL);

let moistureReadings = []
let tempReadings = []
let humidReadings = []

client.on("connect", () => {
    console.log("connected")
    client.subscribe([DATA_REQUEST, SENSOR_RESPONSE])
});
