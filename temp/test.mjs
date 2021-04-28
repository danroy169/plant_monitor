import { Worker } from 'worker_threads'

// const broker = new Worker('../services/broker/src/broker.js')
// const sensor = new Worker('../services/sensor/src/service-sensor.js')
// const gateway = new Worker('../services/gateway/src/service-gateway.js')
// const metric = new Worker('../services/metric/src/service-metric.js')
// const notification = new Worker('../services/notification/src/service-notification.js')
// const threshold = new Worker('../services/threshold/src/service-threshold.js')

const worker1 = new Worker('./worker.mjs', {workerData: {interval: 1000}})

setTimeout(() => {
    worker1.postMessage({interval: 100})
}, 5000)