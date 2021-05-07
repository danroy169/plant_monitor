import { parentPort } from 'worker_threads'
import { DATA_RESPONSE, MESSAGE } from '../../../util/consts.js'
import express from 'express'
import { onAPIDataRequest } from './gateway-lib.js'

const port = 3000
const app = express()

parentPort.on(MESSAGE, msg => {
    console.log('Gateway Service recieved', msg.topic, 'message\n')
})

app.get('/api/metric/:metricID/amount/:amount', (req, res) => {

    const dataRequestMessage = onAPIDataRequest(req)

    if(dataRequestMessage) { parentPort.postMessage(dataRequestMessage) }

    parentPort.on(MESSAGE, msg => { if(msg.topic === DATA_RESPONSE) { return res.json(msg) } })

})


app.listen(port, () => { console.log('Example app listening at http://localhost:' + port) })


