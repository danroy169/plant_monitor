import { connect } from "async-mqtt";

const URL = "mqtt:localhost:8883";

const client = connect(URL);

client.on("connect", () => {
    console.log("connected")
})

client.publish("config/moisture/time-interval", "1");