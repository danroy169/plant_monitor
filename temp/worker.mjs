import { Worker, parentPort, workerData } from 'worker_threads'

let interval = workerData.interval

let intervalId = setInterval(sayHello, interval)

parentPort.on('message', msg => {
    console.log("worker1 message recieved:", msg)
    clearInterval(intervalId)
    intervalId = setInterval(sayHello, msg.interval)
})


function sayHello(){
    console.log("Hello")
}
