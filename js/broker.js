import Aedes from "aedes"
import net from "net"
import validateJSON from "./validator.js"

const PORT = 8883;
const MESSAGES = ["config-request", "config-response", "data-request", "data-response", "email-request", "email-response", "sensor-request", "sensor-response", "threshold-violation"];

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
    console.log(`${client.id} subscribed to ${sub[0].topic}\n`)
})

broker.on("publish", (packet) => {
    console.log(`publish packet recieved. topic: ${packet.topic}\n`)
    if (MESSAGES.includes(packet.topic)) {
        var stringBuf = packet.payload.toString('utf-8');
        var obj = JSON.parse(stringBuf);
        console.log(obj);
        console.log();
        
        if(!validateJSON(obj)) {console.log("invalid message!\n")}
        else {console.log("valid message!\n")}
    }
})