import { Worker } from 'worker_threads'
import { THRESHOLD_VIOLATION, SENSOR_RESPONSE, ONLINE, MESSAGE, CONFIG_REQUEST, SENSOR_SERVICE } from '../../util/consts.js'


// const broker = new Worker('../services/broker/src/broker.js')
// const sensor = new Worker('../services/sensor/src/service-sensor.js')
// const gateway = new Worker('../services/gateway/src/service-gateway.js')
// const metric = new Worker('../services/metric/src/service-metric.js')
// const notification = new Worker('../services/notification/src/service-notification.js')
// const threshold = new Worker('../services/threshold/src/service-threshold.js')

const sensorWorker = new Worker('../../services/sensor/src/service-sensor.js', { workerData: { interval: 3 } })

const thresholdWorker = new Worker('../../services/threshold/src/service-threshold.js', {
    workerData: {
        moistureLow: 300,
        tempLow: 60,
        tempHigh: 85,
        humidLow: 30,
        humidHigh: 70
    }
})

const notificationWorker = new Worker('../../services/notification/src/service-notification.js')

const metricWorker = new Worker('../../services/metric/src/service-metric.js')

const gatewayWorker = new Worker('../../services/gateway/src/service-gateway.js')

const brokerWorker = new Worker('../../services/broker/src/broker.js')



sensorWorker.on(ONLINE, () => { console.log('Sensor online') })

thresholdWorker.on(ONLINE, () => { console.log('Threshold online') })

notificationWorker.on(ONLINE, () => { console.log('Notification online') })

metricWorker.on(ONLINE, () => { console.log('Metric service online') })

gatewayWorker.on(ONLINE, () => { console.log('Gateway service online') })

brokerWorker.on(ONLINE, () => { console.log('Broker online')})



sensorWorker.on(MESSAGE, msg => { if (msg.topic === SENSOR_RESPONSE) { thresholdWorker.postMessage(msg); metricWorker.postMessage(msg); gatewayWorker.postMessage(msg) } } )

thresholdWorker.on(MESSAGE, msg => { if (msg.topic === THRESHOLD_VIOLATION) { notificationWorker.postMessage(msg) } } )

gatewayWorker.on(MESSAGE, msg => { if (msg.topic === CONFIG_REQUEST && msg.target === SENSOR_SERVICE) { sensorWorker.postMessage(msg) } })


// notificationWorker.on(MESSAGE, msg => { console.log(msg) } )





