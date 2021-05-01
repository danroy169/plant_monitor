import { parentPort } from 'worker_threads'
import { CONFIG_REQUEST, MESSAGE, TEMP_SENSOR_SERVICE } from '../../../util/consts.js'
// import { DATA_REQUEST, DATA_RESPONSE, SENSOR_RESPONSE, SENSOR_REQUEST, CONFIG_REQUEST, CONFIG_RESPONSE, URL } from "/home/pi/Projects/Plant Monitor/js/consts.js"



const configRequest = {
    topic: CONFIG_REQUEST,
    target: TEMP_SENSOR_SERVICE,
    setting: 'pollInterval',
    data: 1,
    time: new Date().toISOString()
}


parentPort.on(MESSAGE, msg => { console.log('Gateway Service recieved', msg.topic, 'message\n') })

setTimeout(() => {parentPort.postMessage(configRequest)}, 8000)

