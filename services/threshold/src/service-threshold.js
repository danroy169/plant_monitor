import { parentPort, workerData } from 'worker_threads'
import { SENSOR_RESPONSE, CONFIG_REQUEST } from '../../../util/consts.js'
import { onSensorResponse, onConfigRequest } from './threshold-lib.js'


parentPort.on('message', msg => {
    console.log(workerData)
    if(msg.topic === SENSOR_RESPONSE) { 
        console.log('threshold service recieved', msg.topic, 'message\n') 
        onSensorResponse(msg, parentPort, workerData) 
    }

    if(msg.topic === CONFIG_REQUEST) { 
        console.log('threshold service recieved', msg.topic, 'message\n')
        onConfigRequest(msg, workerData) 
    }
})

