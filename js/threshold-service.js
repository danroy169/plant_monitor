import { connect } from "async-mqtt"
import { THRESHOLD_VIOLATION, CONFIG_REQUEST, CONFIG_RESPONSE, SENSOR_RESPONSE, URL } from "./consts.js"

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
