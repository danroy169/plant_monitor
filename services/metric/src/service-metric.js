import { parentPort } from 'worker_threads'
import { SENSOR_RESPONSE, MESSAGE, DATA_REQUEST } from '../../../util/consts.js'
import { storeData, onDataRequest } from './metric-lib.js'



const dataStore = {
    moisture1Readings: [],
    moisture2Readings: [],
    tempReadings: [],
    humidReadings: []
}


parentPort.on(MESSAGE, msg => { 
    console.log('Metric service recieved', msg.topic, 'message\n')

    if (msg.topic === SENSOR_RESPONSE) { storeData(msg, dataStore) } 

    if (msg.topic === DATA_REQUEST) { 

        const dataResponse = onDataRequest(msg, dataStore)

        if(dataResponse) { parentPort.postMessage(dataResponse) }
    }
})

