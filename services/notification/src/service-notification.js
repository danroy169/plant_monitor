import { connect } from "async-mqtt"
import { THRESHOLD_VIOLATION, CONFIG_RESPONSE, EMAIL_REQUEST, EMAIL_RESPONSE, URL } from "../../../src/consts.js"
//import { THRESHOLD_VIOLATION, CONFIG_RESPONSE, EMAIL_REQUEST, EMAIL_RESPONSE, URL } from "/home/pi/Projects/Plant Monitor/js/consts.js"


const client = connect(URL);

const subscribesTo = [THRESHOLD_VIOLATION, EMAIL_RESPONSE, CONFIG_RESPONSE]

client.on("connect", init);



async function init(){
    console.log("notification service connected")

    await client.subscribe(subscribesTo)

    client.on("message", (topic, message) => {
        if(subscribesTo.includes(topic)) {console.log("Notification service recieved", topic, "message")}

        if(topic === THRESHOLD_VIOLATION) {client.publish(EMAIL_REQUEST, message); console.log("EMAIL REQUEST SENT")}
    })
}

