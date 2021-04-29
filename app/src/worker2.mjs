import { Worker, parentPort, workerData } from 'worker_threads'

console.log(workerData)

parentPort.on('message', msg => {
    console.log('hello', msg)
})