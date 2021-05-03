import { parentPort } from 'worker_threads'
import { CONFIG_REQUEST, DATA_REQUEST, DATA_RESPONSE, HUMIDITY, MESSAGE, MOISTURE, MOISTURE_LOW, MOISTURE_SENSOR_1, TEMP, THRESHOLD_SERVICE } from '../../../util/consts.js'
import isValidMessage from '../../../util/validator.js'
// import { DATA_REQUEST, DATA_RESPONSE, SENSOR_RESPONSE, SENSOR_REQUEST, CONFIG_REQUEST, CONFIG_RESPONSE, URL } from "/home/pi/Projects/Plant Monitor/js/consts.js"



// const configRequest = {
//     topic: CONFIG_REQUEST,
//     target: THRESHOLD_SERVICE,
//     setting: MOISTURE_LOW,
//     data: 400,
//     time: new Date().toISOString()
// }

const dataRequest = {
    topic: DATA_REQUEST,
    metric: TEMP,
    numberOfReadings: 2,
    time: new Date().toISOString()
}


parentPort.on(MESSAGE, msg => { 
    console.log('Gateway Service recieved', msg.topic, 'message\n')
    if(msg.topic === DATA_RESPONSE) {console.log(msg)} })

setTimeout(() => { if(isValidMessage(dataRequest)) { parentPort.postMessage(dataRequest) } }, 8000)

