import { Worker, isMainThread } from 'worker_threads'

// const broker = new Worker('../services/broker/src/broker.js')
// const sensor = new Worker('../services/sensor/src/service-sensor.js')
// const gateway = new Worker('../services/gateway/src/service-gateway.js')
// const metric = new Worker('../services/metric/src/service-metric.js')
// const notification = new Worker('../services/notification/src/service-notification.js')
// const threshold = new Worker('../services/threshold/src/service-threshold.js')

const worker1 = new Worker('./service-sensor.mjs', {workerData: {interval: 3}})
const worker2 = new Worker('./worker.mjs', {workerData: {interval: 3}})

worker1.on('online', err => {console.log('worker1 online')})

worker2.on('online', err => {console.log('worker2 online')})

worker1.on('message', msg => {worker2.postMessage(msg)})

setTimeout(() => {
    worker1.postMessage({interval: 1})
    worker2.postMessage({interval: 1})
}, 8000)



