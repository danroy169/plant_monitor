import { parentPort } from 'worker_threads'
import { DATA_REQUEST, DATA_RESPONSE, MESSAGE, MOISTURE_SENSOR_1 } from '../../../util/consts.js'
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

app.get('/', (req, res) => {
   res.send('Is this even necesary now?')
})

app.get('/api/metric/:metricID/amount/:amount', (req, res) => {

    dataRequest.numberOfReadings = req.params.amount

    if(req.params.metricID === MOISTURE_SENSOR_1){

        dataRequest.metric = MOISTURE_SENSOR_1

        parentPort.postMessage(dataRequest)

        parentPort.on(MESSAGE, msg => { if(msg.topic === DATA_RESPONSE) { return res.status(200).json(msg) } })

    }
})


app.listen(port, () => { console.log('Example app listening at http://localhost:' + port) })





