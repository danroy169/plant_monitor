
import { connect } from "async-mqtt";
import { getMoisture } from "/home/pi/Projects/Plant Monitor/js/read-sensor.js";

const URL = "mqtt:localhost:8883";

const client = connect(URL);

const publishMoisture = async () => {

    try {

        const time = new Date().toLocaleTimeString()
        const date = new Date().toLocaleDateString()
        const moisture = await getMoisture();

        const reading = {
            moisture,
            date,
            time
        }

        console.log(reading);

        const payload = JSON.stringify(reading);

        await client.publish("moisture", payload);

        await client.end();

    } catch (e) {

        console.log(e.stack);

        process.exit();
    }
}

client.on("connect", publishMoisture);
