import { parentPort } from 'worker_threads'
import { DATA_REQUEST, DATA_RESPONSE, HUMIDITY, MESSAGE, MOISTURE_SENSOR_1, TEMP } from '../../../util/consts.js'
import isValidMessage from '../../../util/validator.js'
import  express  from 'express'

const port = 3000
const app = express()

const tempDataRequest = {
    topic: DATA_REQUEST,
    metric: TEMP,
    numberOfReadings: 1,
    time: new Date().toISOString()
}

const humidDataRequest = {
    topic: DATA_REQUEST,
    metric: HUMIDITY,
    numberOfReadings: 1,
    time: new Date().toISOString()
}

const moisture1DataRequest = {
    topic: DATA_REQUEST,
    metric: MOISTURE_SENSOR_1,
    numberOfReadings: 1,
    time: new Date().toISOString()
}

let latestReadings = {}

parentPort.on(MESSAGE, msg => { 
    console.log('Gateway Service recieved', msg.topic, 'message\n')

    if(msg.topic === DATA_RESPONSE && msg.metric === HUMIDITY) { latestReadings.humidity = msg } 
    if(msg.topic === DATA_RESPONSE && msg.metric === TEMP) { latestReadings.temp = msg } 
    if(msg.topic === DATA_RESPONSE && msg.metric === MOISTURE_SENSOR_1) { latestReadings.moisture1 = msg } 

})

app.get('/api/latest-readings', (req, res) => {
    if(isValidMessage(tempDataRequest)) { parentPort.postMessage(tempDataRequest) } 
    if(isValidMessage(humidDataRequest)) { parentPort.postMessage(humidDataRequest) }
    if(isValidMessage(moisture1DataRequest)) { parentPort.postMessage(moisture1DataRequest) }

    res.json(latestReadings)
})


app.listen(port, () => {
    console.log('Example app listening at http://localhost:' + port)
})





