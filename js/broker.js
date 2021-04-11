const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const port = 8883

server.listen(port, function () {
  console.log('server started and listening on port ', port)
})

aedes.on('client', () => {
    console.log("client connected");
})

aedes.on('clientDisconnect', () => {
    console.log("client disconnected");
})

aedes.on("subscribe", (sub, client) => {
    console.log("subscribed")
})

aedes.on("publish", (packet, client) => {
    if (packet.topic == 'moisture') {
        var stringBuf = packet.payload.toString('utf-8');
        var obj = JSON.parse(stringBuf);
        console.log(obj);
    }
})