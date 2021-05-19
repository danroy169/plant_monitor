import { ALL, DATA_REQUEST, AVERAGE } from '../../../util/consts.js'
import isValidMessage from '../../../util/validator.js'



export function onAPIDataRequest(options){

    if(!options.metricID) { throw new Error('Missing metricID parameter') }
    if(!options.amount) { throw new Error('Missing amount parameter') }
    if((options.amount !== ALL && options.amount !== AVERAGE && options.amount !== 'minMax') && !Number.isInteger(Number.parseInt(options.amount))) { throw new Error('Invalid amount parameter') }
    if(options.amount !== ALL && options.amount !== AVERAGE && options.amount !== 'minMax') { options.amount = Number.parseInt(options.amount) }

    const dataRequest = {
        topic: DATA_REQUEST,
        metric: options.metricID,
        numberOfReadings: options.amount,
        time: new Date().toISOString(),
        id: options.id
    }

    if(isValidMessage(dataRequest)) { return dataRequest }

    throw new Error('Invalid request')
}
