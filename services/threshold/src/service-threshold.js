import { parentPort, workerData } from 'worker_threads'
import { SENSOR_RESPONSE, CONFIG_REQUEST } from '../../../util/consts.js'
import { onSensorResponse, onConfigRequest } from './threshold-lib.js'


parentPort.on('message', msg => {
    
    if(msg.topic === SENSOR_RESPONSE) { 
        console.log('threshold service recieved', msg.topic, 'message\n') 

        const violation = onSensorResponse(msg, workerData)

        if(violation) { parentPort.postMessage(violation) }

    }

    if(msg.topic === CONFIG_REQUEST) { 
        console.log('threshold service recieved', msg.topic, 'message\n')
        onConfigRequest(msg, workerData) 
    }
})

