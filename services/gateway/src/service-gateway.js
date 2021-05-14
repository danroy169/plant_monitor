import { parentPort } from 'worker_threads'
import { DATA_RESPONSE, MESSAGE } from '../../../util/consts.js'
import express from 'express'
import { onAPIDataRequest } from './gateway-lib.js'

const port = 3000
const app = express()
const DEFAULT_GLOBAL_TIMEOUT_MS = 1000
const resolveCacheMap = new Map()

let nextValidID = 0

parentPort.on(MESSAGE, msg => {

    if (msg.topic === DATA_RESPONSE) {
        if (!resolveCacheMap.has(msg.id)) { console.log('unreferenced transaction'); return }

        const { resolve, timeoutID } = resolveCacheMap.get(msg.id)

        resolveCacheMap.delete(msg.id)

        clearTimeout(timeoutID)
        resolve(msg)
    }
})

app.get('/api/metric/:metricID/amount/:amount', (req, res) => {

    const transaction = createTransaction(req, onAPIDataRequest({
        metricID: req.params.metricID,
        amount: req.params.amount
    }))

    transaction.then(resultMessage => { promiseSuccess(res, resultMessage) })
        .catch(e => { promiseFail(e, res) })

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


function createTransaction(req, msgToBeSent, timeoutMS = DEFAULT_GLOBAL_TIMEOUT_MS) {

    const thisTransactionID = nextValidID

    nextValidID += 1

    return new Promise((resolve, reject) => {

        const timeoutID = setTimeout(() => {
            resolveCacheMap.delete(thisTransactionID)

            reject(new Error('Timed out'))
        }, timeoutMS)

        resolveCacheMap.set(thisTransactionID, { resolve, reject, timeoutID })

        parentPort.postMessage({ ...msgToBeSent, id: thisTransactionID })
    })
}

function promiseSuccess(res, result) {

    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    })

    res.json(result)
}

function promiseFail(e, response) {
    response.status(408)
    response.json({ message: e.message })
}