
import { connect } from "async-mqtt";
//import { getMoisture } from "./read-sensor.js";
import sleep from "sleep";



async function main(pollInterval) {

    while (true) {
        await publishMoisture(pollInterval);

        sleep.sleep(pollInterval);
    }
}

const publishMoisture = async (pollInterval) => {

    try {

        const URL = "mqtt:localhost:8883";

        const client = connect(URL);
    
        client.on("connect", () => {
            console.log("connected")
        });
    
        client.on("packetsend", packet => {
            if (packet.topic) { console.log(`Packet sent. \nTopic: ${packet.topic} \nPayload: ${packet.payload}\n`) }
        })
    
        const sensorID = "moisture1"
        const time = new Date().toISOString();
        const type = "moisture"
        const moistureLevel = 340 //await getMoisture();
        const currentPollInterval = pollInterval;

        const reading = {
            sensorID,
            time,
            type,
            moistureLevel,
            currentPollInterval
        }

        const payload = JSON.stringify(reading);

        await client.publish("moisture", payload);

        await client.end();

    } catch (e) {

        console.log(e.stack);

        process.exit();
    }
}

await main(5);