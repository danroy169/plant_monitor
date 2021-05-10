import { expect } from 'chai'
import { describe, it } from 'mocha'
import { EMAIL_REQUEST } from '../../../util/consts.js'
import isValidMessage from '../../../util/validator.js'
import getEmailRequestMessage from '../src/notification-lib.js'

describe('getEmailRequestMessage(msg)', () => {

    it('should return a valid Email Request Message', () => {
        
        const msg = {
            topic: 'threshold-violation',
            sensorID: 'moisture2',
            violationType: 'moisture',
            threshold: 330,
            currentLevel: 300,
            time: '2012-01-26T13:51:50.417-07:00'
        }

        const toTest = JSON.parse(getEmailRequestMessage(msg))

        expect(isValidMessage(toTest)).to.be.true

    })

    it('should return a valid email request message with the proper topic property', () => {

        const msg = {
            topic: 'threshold-violation',
            sensorID: 'moisture2',
            violationType: 'moisture',
            threshold: 330,
            currentLevel: 300,
            time: '2012-01-26T13:51:50.417-07:00'
        }

        const toTest = JSON.parse(getEmailRequestMessage(msg))

        expect(toTest.topic).to.equal(EMAIL_REQUEST)
    })

    it('should do nothing when given an invalid msg argument', () => {
        const msg = {}

        const toTest = getEmailRequestMessage(msg)
        
        expect(toTest).to.be.undefined
    })
})