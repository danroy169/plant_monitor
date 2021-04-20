
import { connect } from "async-mqtt"
//import { getMoisture } from "./read-sensor.js"


const URL = "mqtt:localhost:8883"
const SECONDS_TO_MILLI = 1000

let pollIntervalSeconds = 5

const client = connect(URL);

client.on("connect", () => {
    console.log("connected")
    setInterval(publishMoisture, pollIntervalSeconds * SECONDS_TO_MILLI)
});

client.on("packetsend", packet => {
    { console.log(`Packet sent. \nTopic: ${packet.topic} \nPayload: ${packet.payload}\n`) }
})

async function publishMoisture() {

    const sensorID = "moisture1"
    const time = new Date().toISOString()
    const type = "moisture"
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

    await client.publish("sensor-response", payload)

}
