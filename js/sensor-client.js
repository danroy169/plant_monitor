
import { connect } from "async-mqtt"
//import { getMoisture } from "./read-sensor.js"
import { URL, MOISTURE, TEMP, HUMIDITY, MOISTURE_SENSOR_1, SECONDS_TO_MILLI, SENSOR_REQUEST, CONFIG_REQUEST, SENSOR_RESPONSE, CONFIG_RESPONSE } from "./consts.js"

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
