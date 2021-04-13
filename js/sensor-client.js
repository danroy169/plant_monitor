
import { connect } from "async-mqtt";
import { getMoisture } from "/home/pi/Projects/Plant Monitor/js/read-sensor.js";
import sleep from "sleep";

const URL = "mqtt:localhost:8883";

const client = connect(URL);

client.on("connect", () => {
    console.log("connected")
});

client.on("packetsend", packet => {
    if(packet.topic) {console.log(`Packet sent. \nTopic: ${packet.topic} \nPayload: ${packet.payload}\n`)}
})

client.subscribe("config/moisture/time-interval")



async function main(client, timeInterval) {
    while (true) {
        await publishMoisture(client);

        client.on("message", (topic, message) => {
            if(topic === "config/moisture/time-interval") {
                console.log("config message recieved");
                timeInterval = parseInt(message);
            }
        })

        sleep.sleep(timeInterval);
    }
}

const publishMoisture = async (client) => {

    try {

        const time = new Date().toLocaleTimeString()
        const date = new Date().toLocaleDateString()
        const moisture = await getMoisture();

        const reading = {
            moisture,
            date,
            time
        }

        const payload = JSON.stringify(reading);

        await client.publish("moisture", payload);

        // await client.end();

    } catch (e) {

        console.log(e.stack);

        process.exit();
    }
}

await main(client, 5);