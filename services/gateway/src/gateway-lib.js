import { DATA_REQUEST, HUMIDITY, MOISTURE_SENSOR_1, MOISTURE_SENSOR_2, TEMP } from '../../../util/consts.js'
import isValidMessage from '../../../util/validator.js'

const dataRequest = {
    topic: DATA_REQUEST,
    metric: '',
    numberOfReadings: '',
    time: new Date().toISOString()
}


export function onAPIDataRequest(req){
    dataRequest.numberOfReadings = req.params.amount

    if(req.params.metricID === MOISTURE_SENSOR_1){

        dataRequest.metric = MOISTURE_SENSOR_1

        if(isValidMessage(dataRequest)) { return dataRequest }
    }

    if(req.params.metricID === MOISTURE_SENSOR_2){

        dataRequest.metric = MOISTURE_SENSOR_2

        if(isValidMessage(dataRequest)) { return dataRequest }
    }

    if(req.params.metricID === TEMP){

        dataRequest.metric = TEMP

        if(isValidMessage(dataRequest)) { return dataRequest }
    }

    if(req.params.metricID === HUMIDITY){

        dataRequest.metric = HUMIDITY

        if(isValidMessage(dataRequest)) { return dataRequest }
    }

    return false
}