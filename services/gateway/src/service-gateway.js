import { parentPort } from 'worker_threads'
import { DATA_REQUEST, DATA_RESPONSE, HUMIDITY, MESSAGE, MOISTURE_SENSOR_1, TEMP } from '../../../util/consts.js'
import express from 'express'

const port = 3000
const app = express()

const dataRequest = {
    topic: DATA_REQUEST,
    metric: '',
    numberOfReadings: '',
    time: new Date().toISOString()
}


parentPort.on(MESSAGE, msg => {
    console.log('Gateway Service recieved', msg.topic, 'message\n')
})

app.get('/api/metric/:metricID/amount/:amount', (req, res) => {

    dataRequest.numberOfReadings = req.params.amount

    if(req.params.metricID === MOISTURE_SENSOR_1){

        dataRequest.metric = MOISTURE_SENSOR_1

        parentPort.postMessage(dataRequest)
    }

    if(req.params.metricID === TEMP){

        dataRequest.metric = TEMP

        parentPort.postMessage(dataRequest)
    }

    if(req.params.metricID === HUMIDITY){

        dataRequest.metric = HUMIDITY

        parentPort.postMessage(dataRequest)
    }

    parentPort.on(MESSAGE, msg => { if(msg.topic === DATA_RESPONSE) { return res.json(msg) } })

})


app.listen(port, () => { console.log('Example app listening at http://localhost:' + port) })





