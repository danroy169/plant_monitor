import { connect } from "async-mqtt"
import { THRESHOLD_VIOLATION, CONFIG_RESPONSE, EMAIL_REQUEST, EMAIL_RESPONSE, URL } from "../../../src/consts.js"
//import { THRESHOLD_VIOLATION, CONFIG_RESPONSE, EMAIL_REQUEST, EMAIL_RESPONSE, URL } from "/home/pi/Projects/Plant Monitor/js/consts.js"


const client = connect(URL);

client.on("connect", () => {
    console.log("notification service connected")
    client.subscribe([THRESHOLD_VIOLATION, CONFIG_RESPONSE, EMAIL_RESPONSE])
});


// client.on("message", (topic, message, packet) => { if(topic === THRESHOLD_VIOLATION) { console.log("threshold violation recieved!"); client.publish(EMAIL_REQUEST, message.toString()) } })

