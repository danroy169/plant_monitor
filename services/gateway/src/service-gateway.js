import { parentPort } from 'worker_threads'
import { DATA_RESPONSE, MESSAGE } from '../../../util/consts.js'
import express from 'express'
import { onAPIDataRequest } from './gateway-lib.js'

const port = 3000
const app = express()

const resolveCache = {}
let myID = 0

parentPort.on(MESSAGE, msg => {
    console.log('Gateway Service recieved', msg.topic, 'message\n')

    if (msg.topic === DATA_RESPONSE) {
        resolveCache[myID] = msg
    }

})

app.get('/api/metric/:metricID/amount/:amount', (req, res) => {

    const lastID = myID

    myID += 1

    parentPort.postMessage(onAPIDataRequest({
        metricID: req.params.metricID,
        amount: req.params.amount,
        id: lastID
    }))

    let captureResolve = undefined

    const p = new Promise((resolve, reject) => {
        captureResolve = resolveCache[lastID]

        if (captureResolve != undefined) { resolve(captureResolve) }
        else { reject('wtf') }
    })

    p.then(result => {
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        })

        res.json(result) 
    })
    .catch(e => {
        res.status(404)
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


