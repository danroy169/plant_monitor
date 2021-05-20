import { Worker } from 'worker_threads'
import { readFile } from 'fs/promises'
import { THRESHOLD_VIOLATION, SENSOR_RESPONSE, ONLINE, MESSAGE, CONFIG_REQUEST, TEMP_SENSOR_SERVICE, THRESHOLDS, MOISTURE_SENSOR_SERVICE, THRESHOLD_SERVICE, DATA_REQUEST } from '../../util/consts.js'



async function setUp(){

    const configFile = await readFile('./config.json',{ encoding: 'utf-8', flag: 'r' })

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
        const handleWorkerRequest = curryWorkerRequest(workerInstance, workersArray)

        workerInstance.worker.on(MESSAGE, handleWorkerRequest)

    })
}

setUp()

function curryWorkerRequest(workerInstance, workersArray){

    return (msg) => handleWorkerRequestInternal(msg, workerInstance, workersArray)
}


function handleWorkerRequestInternal(msg, workerInstance, workersArray){
    console.log(msg)
    const serviceBinding = [
        {
            topic: 'threshold-violation',
            targetUrn: [
                'urn:Notification-Worker'
            ]
        }
    ]

    const targetUrns = serviceBinding[0].targetUrn

    const serviceWorker = workersArray.filter(wi => targetUrns.includes(wi.urn))

    broadcastMessage(msg, serviceWorker)

}

// moistureSensorWorker.on(MESSAGE, msg => { if (msg.topic === SENSOR_RESPONSE) { broadcastMessage(msg, [thresholdWorker, metricWorker, gatewayWorker, sseWorker]) } } )

// tempHumidSensorWorker.on(MESSAGE, msg => { if (msg.topic === SENSOR_RESPONSE) { broadcastMessage(msg, [thresholdWorker, metricWorker, gatewayWorker, sseWorker]) } })

// thresholdWorker.on(MESSAGE, msg => { if (msg.topic === THRESHOLD_VIOLATION) { notificationWorker.postMessage(msg) } } )

// metricWorker.on(MESSAGE, msg => { gatewayWorker.postMessage(msg) })

// gatewayWorker.on(MESSAGE, msg => { 
//     if (msg.topic === CONFIG_REQUEST && msg.target === TEMP_SENSOR_SERVICE) { tempHumidSensorWorker.postMessage(msg) }
//     if (msg.topic === CONFIG_REQUEST && msg.target === MOISTURE_SENSOR_SERVICE) { moistureSensorWorker.postMessage(msg) }
//     if (msg.topic === CONFIG_REQUEST && msg.target === THRESHOLD_SERVICE) { thresholdWorker.postMessage(msg) }
    
//     if(msg.topic === DATA_REQUEST) { metricWorker.postMessage(msg) }
// })

function broadcastMessage(msg, workersArray){
    workersArray.forEach(worker => worker.postMessage(msg))
}








// const moistureSensorWorker = new Worker('../../services/moisture-sensor/src/service-moisture-sensor.js', { workerData: { interval:3 } })

// const tempHumidSensorWorker = new Worker('../../services/temp-sensor/src/service-temp-sensor.js', { workerData: { interval: 5 } })

// const thresholdWorker = new Worker('../../services/threshold/src/service-threshold.js', { workerData: THRESHOLDS })

// const notificationWorker = new Worker('../../services/notification/src/service-notification.js')

// const metricWorker = new Worker('../../services/metric/src/service-metric.js')

// const gatewayWorker = new Worker('../../services/gateway/src/service-gateway.js')

// const brokerWorker = new Worker('../../services/broker/src/broker.js')

// const sseWorker = new Worker('../../services/sse-gateway/src/service-sse-gateway.js')