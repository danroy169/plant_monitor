import { parentPort } from 'worker_threads'
import { DATA_RESPONSE, MESSAGE } from '../../../util/consts.js'
import express from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import cookieParser from 'cookie-parser'
import { onAPIDataRequest } from './gateway-lib.js'
import csurf from 'csurf'

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

    let timeoutID 

    const thisTransactionID = nextValidID

    const p = apiGetToPromise(nextValidID, thisTransactionID, timeoutID)

    p.then(result => { promiseSuccess(timeoutID, res, result) })
    .catch(e => { promiseFail(e, res, resolveCacheMap, thisTransactionID) })

    parentPort.postMessage(
        onAPIDataRequest({
            metricID: req.params.metricID,
            amount: req.params.amount,
            id: thisTransactionID
        })
    )
})

app.use(helmet())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(csurf({ cookie: true }))
app.use(hpp())

app.use((req, res, next) => {
    res.status(404)

    next(new Error('No handler found'))
})

app.use((err, req, res) => {
    if (res.statusCode === 200) { res.status(500) }

    res.json({ message: err.message })
})

app.listen(port, () => { console.log('Example app listening at http://localhost:' + port) })




function apiGetToPromise(nextValidID, thisTransactionID, timeoutID) {

    nextValidID += 1

    return new Promise((resolve, reject) => {

        resolveCacheMap.set(thisTransactionID, resolve)

        timeoutID = setTimeout(() => reject(new Error('Timed out')), 1000)
    })

}

function promiseSuccess(timeoutID, response, result) {
    clearTimeout(timeoutID)

    response.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    })

    response.json(result)
}

function promiseFail(err, response, resoveCacheMap, thisTransactionID) {
    resolveCacheMap.delete(thisTransactionID)
    response.status(404)
    response.json({pass: false})
}