import { connect } from "async-mqtt"
import { THRESHOLD_VIOLATION, CONFIG_RESPONSE, EMAIL_REQUEST, EMAIL_RESPONSE, URL } from "./consts.js"


const client = connect(URL);

client.on("connect", () => {
    console.log("connected")
    client.subscribe([THRESHOLD_VIOLATION, CONFIG_RESPONSE, EMAIL_RESPONSE])
});


client.on("message", (topic, message, packet) => { if(topic === THRESHOLD_VIOLATION) { console.log("threshold violation recieved!"); client.publish(EMAIL_REQUEST, message.toString()) } })

