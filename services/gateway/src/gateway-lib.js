import { ALL, DATA_REQUEST, HUMIDITY, MOISTURE_SENSOR_1, MOISTURE_SENSOR_2, TEMP } from '../../../util/consts.js'
import isValidMessage from '../../../util/validator.js'

export function onAPIDataRequest(options){

    if(!options.metricID) { throw new Error('Missing metricID parameter') }
    if(!options.amount) { throw new Error('Missing amount parameter') }
    if(options.amount !== ALL) { options.amount = Number.parseInt(options.amount) }

    const dataRequest = {
        topic: DATA_REQUEST,
        metric: '',
        numberOfReadings: options.amount,
        time: new Date().toISOString(),
        id: options.id
    }
    console.log(dataRequest)
    if(options.metricID === MOISTURE_SENSOR_1){

        dataRequest.metric = MOISTURE_SENSOR_1

        if(isValidMessage(dataRequest)) { return dataRequest }
    }

    if(options.metricID === MOISTURE_SENSOR_2){

        dataRequest.metric = MOISTURE_SENSOR_2

        if(isValidMessage(dataRequest)) { return dataRequest }
    }

    if(options.metricID === TEMP){

        dataRequest.metric = TEMP

        if(isValidMessage(dataRequest)) { return dataRequest }
    }

    if(options.metricID === HUMIDITY){

        dataRequest.metric = HUMIDITY

        if(isValidMessage(dataRequest)) { return dataRequest }
    }

    // mixed returns = gross
    throw new Error('Invalid request')
}