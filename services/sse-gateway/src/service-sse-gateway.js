import express from 'express'
import rateLimit from 'express-rate-limit'
import { v4 as uuidv4 } from 'uuid'
import { parentPort } from 'worker_threads'
import { MESSAGE, MOISTURE_SENSOR_1, MOISTURE_SENSOR_2, SSE_PORT } from '../../../util/consts.js'

const app = express()

const timeout = 0

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  })

app.get('/sse', (req, res) => {
    req.socket.setNoDelay(true)
    req.socket.setKeepAlive(true)
    req.socket.setTimeout(timeout)

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
    })

    parentPort.on(MESSAGE, msg => {
        let id = uuidv4()

        const scrubbedMsg = messageScrubber(msg)

        res.write('id: ' + id + '\n')
        res.write('event: ' + 'message' + '\n')
        res.write('data: ' + JSON.stringify(scrubbedMsg) + '\n')
        res.write('\n')
    })

    req.on('close', () => { parentPort.removeAllListeners(MESSAGE) })

    req.on('abort', () => { parentPort.removeAllListeners(MESSAGE) })
    
})

app.use(limiter)

app.listen(SSE_PORT, () => { console.log('SSE service listening at http://localhost:' + SSE_PORT) })

function messageScrubber(msg){
    const result = { 
        sensorID: msg.sensorID,
        time: new Date(msg.time).toLocaleTimeString()
    }
    if(msg.sensorID === MOISTURE_SENSOR_1 || msg.sensorID === MOISTURE_SENSOR_2) { result.moistureLevel = msg.moistureLevel }
    if(msg.fahrenheit) { result.fahrenheit = msg.fahrenheit }
    if(msg.percent) { result.percent = msg.percent }

    return result
}