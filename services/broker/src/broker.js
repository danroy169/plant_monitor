import Aedes from 'aedes'
import net from 'net'
import { PORT } from '../../../util/consts.js'

const broker = new Aedes()

const server = net.createServer(broker.handle)

server.listen(PORT, function () { console.log('MQTT server started and listening on port ', PORT) })



