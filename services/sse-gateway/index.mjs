import express from 'express'

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

    setInterval(() => {
        console.log('sending event')
        id += 1
        res.write('id: ' + id + '\n')
        res.write('event: ' + 'test' + '\n')
        res.write('data: ' + JSON.stringify({data: 'hello world'}) + '\n')
        res.write('\n')
    }, 1000*5)

})

app.listen(PORT, () => { console.log('Example app listening at http://localhost:' + PORT) })


