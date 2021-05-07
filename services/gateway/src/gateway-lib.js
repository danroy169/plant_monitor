import { DATA_REQUEST, HUMIDITY, MOISTURE_SENSOR_1, MOISTURE_SENSOR_2, TEMP } from '../../../util/consts.js'
import isValidMessage from '../../../util/validator.js'




export function onAPIDataRequest(options){
    if(!options.metricID) { throw new Error('Missing metricID parameter') }

    const dataRequest = {
        topic: DATA_REQUEST,
        metric: '',
        numberOfReadings: '',
        time: new Date().toISOString()
    }

    dataRequest.numberOfReadings = options.amount

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