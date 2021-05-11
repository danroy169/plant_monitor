import { expect } from 'chai'
import { describe, it } from 'mocha'
import { onAPIDataRequest } from '../services/gateway/src/gateway-lib.js'
import isValidMessage from '../util/validator.js'
import { ALL, HUMIDITY, MOISTURE_SENSOR_1, MOISTURE_SENSOR_2, TEMP } from '../util/consts.js'

describe('onAPIDataRequest(options)', () => {

    it('should return an object when given the proper params', () => {
        const options = {
            metricID: 'moisture1',
            amount: 'all'
        }
        
        expect(onAPIDataRequest(options)).to.be.an.instanceOf(Object)
    })

    it('should return a valid dataRequest message when given the proper params', () => {
        const options = {
            metricID: 'moisture1',
            amount: 'all'
        }

        const expected = onAPIDataRequest(options)

        expect(isValidMessage(expected)).to.be.true
    })

    it('should return a dataRequest message with proper metric(moisture1)', () => {
        const options = {
            metricID: MOISTURE_SENSOR_1,
            amount: 1
        }

        const toTest = onAPIDataRequest(options)

        expect(toTest.metric).to.equal(MOISTURE_SENSOR_1)
    })

    it('should return a dataRequest message with proper metric(moisture2)', () => {
        const options = {
            metricID: MOISTURE_SENSOR_2,
            amount: 1
        }

        const toTest = onAPIDataRequest(options)

        expect(toTest.metric).to.equal(MOISTURE_SENSOR_2)
    })

    it('should return a dataRequest message with proper metric(temp)', () => {
        const options = {
            metricID: TEMP,
            amount: 1
        }

        const toTest = onAPIDataRequest(options)

        expect(toTest.metric).to.equal(TEMP)
    })

    it('should return a dataRequest message with proper metric(humidity)', () => {
        const options = {
            metricID: HUMIDITY,
            amount: 1
        }

        const toTest = onAPIDataRequest(options)

        expect(toTest.metric).to.equal(HUMIDITY)
    })

    it('should return a dataRequest message with the proper numberOfReadings property when passed an options object with an integer amount property', () => {
        const options = {
            metricID: HUMIDITY,
            amount: 1
        }

        const toTest = onAPIDataRequest(options)

        expect(toTest.numberOfReadings).to.equal(1)
    })

    it('should return a dataRequest message with the proper numberOfReadings property when passed an options object with an \'all\' amount property', () => {
        const options = {
            metricID: HUMIDITY,
            amount: ALL
        }

        const toTest = onAPIDataRequest(options)

        expect(toTest.numberOfReadings).to.equal(ALL)
    })

    it('should throw an error when given an options object without a metricID property', () => {
        const options = {
            amount: 1
        }

        expect(function () { onAPIDataRequest(options) }).to.throw('Missing metricID parameter')
    })

    it('should throw an error when given an options object without an amount property', () => {
        const options = {
            metricID: TEMP
        }

        expect(function () { onAPIDataRequest(options) }).to.throw('Missing amount parameter')
    })

    it('should throw an error when given an argument with an invalid metricID property', () => {
        const options = {
            metricID: 'this should fail',
            amount: 1
        }

        expect(function () { onAPIDataRequest(options) }).to.throw('Invalid request')
    })

    it('should throw an error when given an argument with an invalid amount property', () => {
        const options = {
            metricID: TEMP,
            amount: 'this should fail'
        }

        expect(function () { onAPIDataRequest(options) }).to.throw('Invalid amount parameter')
    })
    
    it('should throw an error when given an argument with an float amount property', () => {
        const options = {
            metricID: TEMP,
            amount: 1.5
        }

        expect(function () { onAPIDataRequest(options) }).to.throw('Invalid amount parameter')
    })
})