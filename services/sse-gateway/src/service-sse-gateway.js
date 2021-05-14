import express from 'express'
import { parentPort } from 'worker_threads'
import { MESSAGE } from '../../../util/consts.js'
import helmet from 'helmet'
import hpp from 'hpp'
import csurf from 'csurf'
import cookieParser from 'cookie-parser'



const app = express()

const PORT = 3030

const timeout = 0

app.get('/sse', (req, res) => {

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
        id += 1
        res.write('id: ' + id + '\n')
        res.write('event: ' + 'message' + '\n')
        res.write('data: ' + JSON.stringify(msg) + '\n')
        res.write('\n')
    })

})

app.use(helmet())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(csurf({ cookie: true }))
app.use(hpp())

app.listen(PORT, () => { console.log('Example app listening at http://localhost:' + PORT) })


