import { ALL, DATA_REQUEST, AVERAGE, MIN_MAX, CONFIG_REQUEST, URN, POLL_INTERVAL, MOISTURE_LOW } from '../../../util/consts.js'
import isValidMessage from '../../../util/validator.js'

export function onAPIDataRequest(options) {

    if (!options.metricID) { throw new Error('Missing metricID parameter') }
    if (!options.amount) { throw new Error('Missing amount parameter') }

    if ((options.amount !== ALL && options.amount !== AVERAGE && options.amount !== MIN_MAX) && !Number.isInteger(Number.parseInt(options.amount))) { throw new Error('Invalid amount parameter') }
    if (options.amount !== ALL && options.amount !== AVERAGE && options.amount !== MIN_MAX) { options.amount = Number.parseInt(options.amount) }

    const dataRequest = {
        topic: DATA_REQUEST,
        metric: options.metricID,
        numberOfReadings: options.amount,
        time: new Date().toISOString(),
        id: options.id
    }

    if (isValidMessage(dataRequest)) { return dataRequest }

    throw new Error('Invalid request')
}

export function onAPIConfigRequest(options) {

    if (!options.worker) { throw new Error('Missing worker parameter') }
    if(options.worker === 'Temp-Sensor-Worker' && options.pollInterval <= 1) { throw new Error('Poll Interval must be greater than 1 for temp/humid worker') }

    const configRequest = {
        topic: CONFIG_REQUEST,
        target: URN + options.worker,
        time: new Date().toISOString(),
    }

    if(options.pollInterval) {
        configRequest.setting = POLL_INTERVAL
        configRequest.data = Number.parseInt(options.pollInterval)
    }

    if(options.moistureLow) {
        configRequest.setting = MOISTURE_LOW
        configRequest.data = options.moistureLow
    }
    
    if (isValidMessage(configRequest)) { return configRequest }

    throw new Error('Invalid Request')

}