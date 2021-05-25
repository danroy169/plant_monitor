import { parentPort, workerData } from 'worker_threads'
import { SENSOR_RESPONSE, CONFIG_REQUEST, MESSAGE } from '../../../util/consts.js'
import { onSensorResponse, onConfigRequest } from './threshold-lib.js'


parentPort.on(MESSAGE, msg => {
    
    if(msg.topic === SENSOR_RESPONSE) { 

        const violation = onSensorResponse(msg, workerData)

        if(violation) { parentPort.postMessage(violation) }
    }

    if(msg.topic === CONFIG_REQUEST) { onConfigRequest(msg, workerData) }
})

