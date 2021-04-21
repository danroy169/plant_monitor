import { connect } from "async-mqtt"
import { THRESHOLD_VIOLATION, CONFIG_RESPONSE, EMAIL_REQUEST, EMAIL_RESPONSE, URL } from "./consts.js"


const client = connect(URL);

client.on("connect", () => {
    console.log("connected")
    client.subscribe([THRESHOLD_VIOLATION, CONFIG_RESPONSE, EMAIL_RESPONSE])
});


