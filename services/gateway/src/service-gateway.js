import { parentPort } from 'worker_threads'
import { DATA_RESPONSE, MESSAGE } from '../../../util/consts.js'
import express from 'express'
import { onAPIDataRequest } from './gateway-lib.js'

const port = 3000
const app = express()

const resolveCacheMap = new Map()

let nextValidID = 0


parentPort.on(MESSAGE, msg => {
    // console.log('Gateway Service recieved', msg.topic, 'message\n')
    if (msg.topic === DATA_RESPONSE) {

        const resolver = resolveCacheMap.get(msg.id)
        resolveCacheMap.delete(msg.id)

        resolver(msg)
    }
})

app.get('/api/metric/:metricID/amount/:amount', (req, res) => {

    const thisTransactionID = nextValidID

    let tID

    nextValidID += 1

    const p = new Promise((resolve, reject) => {

        resolveCacheMap.set(thisTransactionID, resolve)

        tID = setTimeout(() => reject(new Error('Timed out')), 1000)
    })

    p.then(result => {
        clearTimeout(tID)

        res.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        })

        res.json(result)
    })
    .catch(e => {
        resolveCacheMap.delete(thisTransactionID)
        res.status(404)
        res.json({pass: false})
    })

    parentPort.postMessage(
        onAPIDataRequest({
            metricID: req.params.metricID,
            amount: req.params.amount,
            id: thisTransactionID
        })
    )
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


