import express from 'express'
import { parentPort } from 'worker_threads'
import { MESSAGE } from '../../../util/consts.js'

const app = express()

const PORT = 3030

const timeout = 0

app.get('/sse', (req, res) => {
    console.log('request recieved')

    req.socket.setNoDelay(true)
    req.socket.setKeepAlive(true)
    req.socket.setTimeout(timeout)

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
    })

    var id = 0

    parentPort.on(MESSAGE, msg => {
        // console.log('SSE Service recieved', msg.topic, 'message\n')
        
        console.log('sending event')
        id += 1
        res.write('id: ' + id + '\n')
        res.write('event: ' + 'message' + '\n')
        res.write('data: ' + JSON.stringify(msg) + '\n')
        res.write('\n')
    })

})

app.listen(PORT, () => { console.log('Example app listening at http://localhost:' + PORT) })


