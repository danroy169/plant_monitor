// const aedes = require('aedes')()
import Aedes from "aedes"
import net from "net"

const PORT = 8883

const broker = new Aedes();
const server = net.createServer(broker.handle)


server.listen(PORT, function () {
    console.log('server started and listening on port ', PORT)
})

broker.on('client', () => {
    console.log("client connected");
})

broker.on('clientDisconnect', () => {
    console.log("client disconnected");
})

broker.on("subscribe", (sub, client) => {
    console.log("subscribed")
})

broker.on("publish", (packet, client) => {
    console.log(`message from recieved, topic: ${packet.topic}`)
    if (packet.topic === "moisture") {
        var stringBuf = packet.payload.toString('utf-8');
        var obj = JSON.parse(stringBuf);
        console.log(obj);
    }
})