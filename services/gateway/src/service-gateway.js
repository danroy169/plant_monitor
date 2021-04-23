import { connect } from "async-mqtt"
 import { DATA_REQUEST, DATA_RESPONSE, SENSOR_RESPONSE, SENSOR_REQUEST, CONFIG_REQUEST, CONFIG_RESPONSE, URL } from "../../../src/consts.js"
// import { DATA_REQUEST, DATA_RESPONSE, SENSOR_RESPONSE, SENSOR_REQUEST, CONFIG_REQUEST, CONFIG_RESPONSE, URL } from "/home/pi/Projects/Plant Monitor/js/consts.js"

const client = connect(URL);

const configRequest = {
    target: "service-sensor",
    setting: "pollInterval",
    data: 1,
    time: new Date().toISOString()
}

client.on("connect", () => {
    console.log("gateway service connected")

    client.subscribe([DATA_RESPONSE, SENSOR_RESPONSE, CONFIG_RESPONSE])

    setTimeout(() => {
        client.publish(CONFIG_REQUEST, JSON.stringify(configRequest))
    }, 10000)

});

