import { Worker, parentPort, workerData } from 'worker_threads'

// let interval = workerData.interval

// let intervalId = setInterval(sayHello, interval * 1000)

parentPort.on('message', msg => {
    console.log("worker2 message recieved:", msg)
    // clearInterval(intervalId)
    // intervalId = setInterval(sayHello, msg.interval * 1000)
})

function sayHello(){
    console.log("Hello from worker2")
}
