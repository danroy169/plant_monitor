import { Worker } from 'worker_threads'
import { THRESHOLD_VIOLATION, SENSOR_RESPONSE, ONLINE, MESSAGE, CONFIG_REQUEST, TEMP_SENSOR_SERVICE, THRESHOLDS, MOISTURE_SENSOR_SERVICE, THRESHOLD_SERVICE, DATA_REQUEST } from '../../util/consts.js'


const moistureSensorWorker = new Worker('../../services/moisture-sensor/src/service-sensor.js', { workerData: { interval: 3 } })

const tempHumidSensorWorker = new Worker('../../services/temp-sensor/src/service-temp-sensor.js', { workerData: { interval: 3 } })

const thresholdWorker = new Worker('../../services/threshold/src/service-threshold.js', { workerData: THRESHOLDS })

const notificationWorker = new Worker('../../services/notification/src/service-notification.js')

const metricWorker = new Worker('../../services/metric/src/service-metric.js')

const gatewayWorker = new Worker('../../services/gateway/src/service-gateway.js')

const brokerWorker = new Worker('../../services/broker/src/broker.js')



moistureSensorWorker.on(ONLINE, () => { console.log('Sensor online') })

thresholdWorker.on(ONLINE, () => { console.log('Threshold online') })

notificationWorker.on(ONLINE, () => { console.log('Notification online') })

metricWorker.on(ONLINE, () => { console.log('Metric service online') })

gatewayWorker.on(ONLINE, () => { console.log('Gateway service online') })

brokerWorker.on(ONLINE, () => { console.log('Broker online')})

tempHumidSensorWorker.on(ONLINE, () => { console.log('Temp/Humid Sensor online')})



moistureSensorWorker.on(MESSAGE, msg => { if (msg.topic === SENSOR_RESPONSE) { thresholdWorker.postMessage(msg); metricWorker.postMessage(msg); gatewayWorker.postMessage(msg); console.log(msg) } } )

tempHumidSensorWorker.on(MESSAGE, msg => { if (msg.topic === SENSOR_RESPONSE) {thresholdWorker.postMessage(msg); metricWorker.postMessage(msg); gatewayWorker.postMessage(msg); console.log(msg)} })

thresholdWorker.on(MESSAGE, msg => { if (msg.topic === THRESHOLD_VIOLATION) { notificationWorker.postMessage(msg) } } )

gatewayWorker.on(MESSAGE, msg => { 
    if (msg.topic === CONFIG_REQUEST && msg.target === TEMP_SENSOR_SERVICE) { tempHumidSensorWorker.postMessage(msg) } 
    if (msg.topic === CONFIG_REQUEST && msg.target === MOISTURE_SENSOR_SERVICE) { moistureSensorWorker.postMessage(msg) } 
    if (msg.topic === CONFIG_REQUEST && msg.target === THRESHOLD_SERVICE) { thresholdWorker.postMessage(msg) }
    if(msg.topic === DATA_REQUEST) { metricWorker.postMessage(msg) }
})

metricWorker.on(MESSAGE, msg => { gatewayWorker.postMessage(msg) })


// notificationWorker.on(MESSAGE, msg => { console.log(msg) } )





