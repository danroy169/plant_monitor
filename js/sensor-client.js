
import { connect } from "async-mqtt"
//import { getMoisture } from "./read-sensor.js"


const URL = "mqtt:localhost:8883"

const MOISTURE = "moisture"
const TEMP = "temp"
const HUMIDITY = "humidity"

const MOISTURE_SENSOR_1 = "moisture1"

const SECONDS_TO_MILLI = 1000

const SENSOR_REQUEST = "sensor-request"
const CONFIG_REQUEST = "config-request"
const SENSOR_RESPONSE = "sensor-response"
const CONFIG_RESPONSE = "config-response"

let pollIntervalSeconds = 5

const client = connect(URL);

client.on("connect", () => {
    console.log("connected")
    client.subscribe([SENSOR_REQUEST, CONFIG_REQUEST])
    setInterval(publishMoisture, pollIntervalSeconds * SECONDS_TO_MILLI)
});

client.on("packetsend", packet => {
    { console.log(`Packet sent. \nTopic: ${packet.topic} \nPayload: ${packet.payload}\n`) }
})


async function publishMoisture() {

    const sensorID = MOISTURE_SENSOR_1
    const time = new Date().toISOString()
    const type = MOISTURE
    const moistureLevel = 340 //await getMoisture();
    const currentPollInterval = pollIntervalSeconds

    const reading = {
        sensorID,
        time,
        type,
        moistureLevel,
        currentPollInterval
    }

    const payload = JSON.stringify(reading)

    await client.publish(SENSOR_RESPONSE, payload)

}
