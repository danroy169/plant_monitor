import { expect } from 'chai'
import { describe, it } from 'mocha'
import { SENSOR_RESPONSE, TEMP, TEMP_HUMIDITY_SENSOR } from '../util/consts.js'
import isAValidMessage from '../util/validator.js'

describe('validator', () => {
    describe('isAValidMessage(msg)', () => {

        it('should return true when given a valid message', () => {

            const msg = {
                time: new Date().toISOString(),
                topic: SENSOR_RESPONSE,
                sensorID: TEMP_HUMIDITY_SENSOR,
                type: TEMP,
                fahrenheit: 350,
                currentPollInterval: 5
            }

            expect(isAValidMessage(msg)).to.be.true
        })

        it('should return false when given an invalid message', () => {

            // wront date format
            const msg = {
                time: new Date(),
                topic: SENSOR_RESPONSE,
                sensorID: TEMP_HUMIDITY_SENSOR,
                type: TEMP,
                fahrenheit: 350,
                currentPollInterval: 5
            }

            expect(isAValidMessage(msg)).to.be.false
        })
    })
})
