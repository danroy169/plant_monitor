import { connect } from "async-mqtt"
import { DATA_REQUEST, DATA_RESPONSE, SENSOR_RESPONSE, SENSOR_REQUEST, CONFIG_REQUEST, CONFIG_RESPONSE, URL} from "./consts.js"

const client = connect(URL);



client.on("connect", () => {
    console.log("connected")
    client.subscribe([DATA_RESPONSE, SENSOR_RESPONSE, CONFIG_RESPONSE])
});