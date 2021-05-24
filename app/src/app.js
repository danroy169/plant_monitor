import { Worker } from 'worker_threads'
import { readFile } from 'fs/promises'
import { THRESHOLD_VIOLATION, SENSOR_RESPONSE, ONLINE, MESSAGE, CONFIG_REQUEST, TEMP_SENSOR_SERVICE, THRESHOLDS, MOISTURE_SENSOR_SERVICE, THRESHOLD_SERVICE, DATA_REQUEST } from '../../util/consts.js'



async function setUp(){

    const configFile = await readFile('./config.json', { encoding: 'utf-8', flag: 'r' })

    const config = JSON.parse(configFile)

    console.log(config.name)

    return config.workers.map((workerConfig) => {

        const options = { workerData: workerConfig.workerData }
        const worker = new Worker(workerConfig.url, options)

        worker.on(ONLINE, () => { console.log(workerConfig.urn, 'online') })

        return { 
            ...workerConfig, 
            worker
        }
    })
        .map((workerInstance, index, workersArray) => {
            const handleWorkerRequest = curryWorkerRequest(workerInstance, workersArray, config.bindings)

            workerInstance.worker.on(MESSAGE, handleWorkerRequest)

        })
}

setUp()

function curryWorkerRequest(workerInstance, workersArray, bindings){

    return (msg) => handleWorkerRequestInternal(msg, workerInstance, workersArray, bindings)
}


function handleWorkerRequestInternal(msg, workerInstance, workersArray, bindings){
    
    const targetUrns = bindings.find((binding) => {
        return binding['source-urn'] === workerInstance.urn && msg.topic === binding.topic
    })['target-urn']


    const serviceWorkers = workersArray.filter(wi => targetUrns.includes(wi.urn)).map((obj) => {
        return obj.worker
    })

    console.log(workerInstance.urn, 'sending', msg.topic, 'to', targetUrns)

    broadcastMessage(msg, serviceWorkers)

}

// gatewayWorker.on(MESSAGE, msg => { 
//     if (msg.topic === CONFIG_REQUEST && msg.target === TEMP_SENSOR_SERVICE) { tempHumidSensorWorker.postMessage(msg) }
//     if (msg.topic === CONFIG_REQUEST && msg.target === MOISTURE_SENSOR_SERVICE) { moistureSensorWorker.postMessage(msg) }
//     if (msg.topic === CONFIG_REQUEST && msg.target === THRESHOLD_SERVICE) { thresholdWorker.postMessage(msg) }
    
//     if(msg.topic === DATA_REQUEST) { metricWorker.postMessage(msg) }
// })

function broadcastMessage(msg, workersArray){
    workersArray.forEach(worker => worker.postMessage(msg))
}

