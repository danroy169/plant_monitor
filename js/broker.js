import Aedes from "aedes"
import net from "net"
import validateJSON from "./validator.js"
import { PORT, TOPICS } from "./consts.js"

const broker = new Aedes();
const server = net.createServer(broker.handle)


server.listen(PORT, function () {
    console.log('server started and listening on port ', PORT)
})

broker.on('client', () => {
    console.log("client connected\n");
})

broker.on('clientDisconnect', () => {
    console.log("client disconnected\n");
})

broker.on("subscribe", (sub, client) => {
    sub.forEach(obj => {
        console.log(`${client.id} subscribed to ${obj.topic}\n`);
    }) 
})

broker.on("publish", (packet) => {
    console.log(`publish packet recieved. topic: ${packet.topic}\n`)
    if (TOPICS.includes(packet.topic)) {
        var stringBuf = packet.payload.toString('utf-8');
        var obj = JSON.parse(stringBuf);
        console.log(obj);
        console.log();
        
        if(!validateJSON(obj)) {console.log("invalid message!\n")}
        else {console.log("valid message!\n")}
    }
})