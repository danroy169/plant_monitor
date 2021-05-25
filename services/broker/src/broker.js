import Aedes from 'aedes'
import net from 'net'
import { MQTT_PORT } from '../../../util/consts.js'

const broker = new Aedes()

const server = net.createServer(broker.handle)

server.listen(MQTT_PORT, function () { console.log('MQTT server started and listening on port ', MQTT_PORT) })



