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

    parentPort.postMessage(onAPIDataRequest({
        metricID: req.params.metricID,
        amount: req.params.amount
    }))

    parentPort.on(MESSAGE, msg => { 

        if(msg.topic === DATA_RESPONSE) { 

            res.set({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            })

            return res.json(msg) 
        } 
    })
})

app.use((req, res, next) => {
    res.status(404)

    next(new Error('No handler found'))
})

app.use((err, req, res) => {
    if (res.statusCode === 200) { res.status(500) }

    res.json({ message: err.message })
})




app.listen(port, () => { console.log('Example app listening at http://localhost:' + port) })


