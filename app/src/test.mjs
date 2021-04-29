import { Worker } from 'worker_threads'
import { THRESHOLD_VIOLATION, SENSOR_RESPONSE, ONLINE, MESSAGE } from '../../src/consts.js'

// const broker = new Worker('../services/broker/src/broker.js')
// const sensor = new Worker('../services/sensor/src/service-sensor.js')
// const gateway = new Worker('../services/gateway/src/service-gateway.js')
// const metric = new Worker('../services/metric/src/service-metric.js')
// const notification = new Worker('../services/notification/src/service-notification.js')
// const threshold = new Worker('../services/threshold/src/service-threshold.js')

const sensorWorker = new Worker('./service-sensor.mjs', { workerData: { interval: 3 } })

const thresholdWorker = new Worker('../../services/threshold/src/service-threshold.js', {
    workerData: {
        moistureLow: 300,
        tempLow: 60,
        tempHigh: 85,
        humidLow: 30,
        humidHigh: 70
    }
})

sensorWorker.on(ONLINE, () => { console.log('Sensor online') })

thresholdWorker.on(ONLINE, () => { console.log('Threshold online') })

sensorWorker.on(MESSAGE, msg => {
    if (msg.topic === SENSOR_RESPONSE) { thresholdWorker.postMessage(msg) }
})

thresholdWorker.on(MESSAGE, msg => {
    if (msg.topic === THRESHOLD_VIOLATION) { console.log(msg) }
})




