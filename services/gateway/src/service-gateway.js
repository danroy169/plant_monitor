import { connect } from 'async-mqtt'
import { DATA_RESPONSE, SENSOR_RESPONSE, CONFIG_RESPONSE, URL, SENSOR_REQUEST } from '../../../src/consts.js'
// import { DATA_REQUEST, DATA_RESPONSE, SENSOR_RESPONSE, SENSOR_REQUEST, CONFIG_REQUEST, CONFIG_RESPONSE, URL } from "/home/pi/Projects/Plant Monitor/js/consts.js"

const subscribesTo = [SENSOR_RESPONSE, CONFIG_RESPONSE, DATA_RESPONSE]

const client = connect(URL)

// const configRequest = {
//     target: 'service-sensor',
//     setting: 'pollInterval',
//     data: 10,
//     time: new Date().toISOString()
// }

const sensorRequest = {
    sensorID: 'moisture1',
    type: 'moisture',
    time: new Date().toISOString()
}

client.on('connect', init)

async function init(){
    console.log('gateway service connected')

    await client.subscribe(subscribesTo)

    client.on('message', (topic) => {if(subscribesTo.includes(topic)) { console.log('Gateway recieved', topic, 'message') } })

    setTimeout(() => {
        client.publish(SENSOR_REQUEST, JSON.stringify(sensorRequest))
    }, 10000)
}