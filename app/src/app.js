import { Worker } from 'worker_threads'
import { readFile } from 'fs/promises'
import { ONLINE, MESSAGE } from '../../util/consts.js'



async function setUp(){

    const configFile = await readFile('./config-mock.json', { encoding: 'utf-8', flag: 'r' })

    const config = JSON.parse(configFile)

    console.log(config.name)

    return config.workers.map(workerConfig => {

        const options = { workerData: workerConfig.workerData }
        const worker = new Worker(workerConfig.url, options)

        worker.on(ONLINE, () => { console.log(workerConfig.urn, ONLINE) })

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
    
    const binding = 
        bindings.find(binding => {
            return binding['source-urn'] === workerInstance.urn && msg.topic === binding.topic
        })
    
    // function here
    const targetUrns = binding['target-individual'] && binding['target-urn'].includes(msg.target) ?
        [msg.target]
        :
        binding['target-urn']

    const serviceWorkers = workersArray.filter(wi => targetUrns.includes(wi.urn)).map(obj => {
        return obj.worker
    })

    // console.log(workerInstance.urn, 'sending', msg.topic, 'to', targetUrns)

    broadcastMessage(msg, serviceWorkers)

}

function broadcastMessage(msg, workersArray){
    workersArray.forEach(worker => worker.postMessage(msg))
}

