import { connect } from 'async-mqtt'
import { DATA_REQUEST, SENSOR_RESPONSE, URL, MOISTURE, TEMP, HUMIDITY } from '../../../util/consts.js'
//import { DATA_REQUEST, DATA_RESPONSE, SENSOR_RESPONSE, URL, MOISTURE, TEMP, HUMIDITY } from "/home/pi/Projects/Plant Monitor/js/consts.js"

const client = connect(URL)

const subscribesTo = [SENSOR_RESPONSE, DATA_REQUEST]

const dataStore = {
    moistureReadings: [],
    tempReadings: [],
    humidReadings: []
}


client.on('connect', init)

async function init(){
    console.log('metric service connected')

    await client.subscribe(subscribesTo)

    client.on('message', (topic, message) => {
        if(subscribesTo.includes(topic)) {console.log('Metric service recieved', topic, 'message')}

        let obj = JSON.parse(message.toString())
    
        if(obj.type === MOISTURE)  {dataStore.moistureReadings.push(obj)}
        if(obj.type === TEMP)  {dataStore.tempReadings.push(obj)}
        if(obj.type === HUMIDITY)  {dataStore.humidReadings.push(obj)}
    
    })

}

