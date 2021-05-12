import { expect } from 'chai'
import { describe, it } from 'mocha'
import { HUMIDITY, HUMID_HIGH, HUMID_LOW, MOISTURE, MOISTURE_LOW, MOISTURE_SENSOR_1, SENSOR_RESPONSE, TEMP, TEMP_HIGH, TEMP_HUMIDITY_SENSOR, TEMP_LOW } from '../util/consts.js'
import isValidMessage from '../util/validator.js'
import { onConfigRequest, onSensorResponse, isAThresholdViolation, convertToThresholdViolationMessage } from '../services/threshold/src/threshold-lib.js'

describe('threshold service lib', () => {

    describe('onConfigRequest(msg, workerData)', () => {

        it('should set the proper moistureLow threshold on workerData', () => {
    
            const msg = {
                setting: MOISTURE_LOW,
                data: 200
            }
    
            const workerData = {
                moistureLow: 500
            }
    
            onConfigRequest(msg, workerData)
    
            expect(workerData.moistureLow).to.equal(msg.data)
        })
    
        it('should set the proper tempLow threshold on workerData', () => {
    
            const msg = {
                setting: TEMP_LOW,
                data: 20
            }
    
            const workerData = {
                tempLow: 500
            }
    
            onConfigRequest(msg, workerData)
    
            expect(workerData.tempLow).to.equal(msg.data)
        })
    
        it('should set the proper tempHigh threshold on workerData', () => {
    
            const msg = {
                setting: TEMP_HIGH,
                data: 200
            }
    
            const workerData = {
                tempHigh: 500
            }
    
            onConfigRequest(msg, workerData)
    
            expect(workerData.tempHigh).to.equal(msg.data)
        })
    
        it('should set the proper humidLow threshold on workerData', () => {
    
            const msg = {
                setting: HUMID_LOW,
                data: 200
            }
    
            const workerData = {
                humidLow: 500
            }
    
            onConfigRequest(msg, workerData)
    
            expect(workerData.humidLow).to.equal(msg.data)
        })
    
        it('should set the proper humidHigh threshold on workerData', () => {
    
            const msg = {
                setting: HUMID_HIGH,
                data: 200
            }
    
            const workerData = {
                HUMID_HIGH: 500
            }
    
            onConfigRequest(msg, workerData)
    
            expect(workerData.humidHigh).to.equal(msg.data)
        })
    
        it('should do nothing when given an invalid msg argument', () => {
    
            const msg = {}
    
            const workerData = {
                moistureLow: 200
            }
    
            onConfigRequest(msg, workerData)
    
            expect(workerData.moistureLow).to.equal(200)
        })
    })
    
    describe('onSensorResponse(msg, workerData)', () => {
    
        it('should return a valid threshold violation message when the moisture low threshold is crossed', () => {
            
            const msg = { 
                time: new Date().toISOString(),
                topic: SENSOR_RESPONSE,
                sensorID: MOISTURE_SENSOR_1,
                type: MOISTURE,
                moistureLevel: 0,
                currentPollInterval: 5
             }
            const workerData = {
                moistureLow: 300
            }
    
            const toTest = onSensorResponse(msg, workerData)
    
            expect(isValidMessage(toTest)).to.be.true
        })
    
        it('should return a valid threshold violation message when the temp low threshold is crossed', () => {
            
            const msg = { 
                time: new Date().toISOString(),
                topic: SENSOR_RESPONSE,
                sensorID: TEMP_HUMIDITY_SENSOR,
                type: TEMP,
                fahrenheit: 0,
                currentPollInterval: 5
             }
            const workerData = {
                tempLow: 300
            }
    
            const toTest = onSensorResponse(msg, workerData)
    
            expect(isValidMessage(toTest)).to.be.true
        })
    
        // Below fails when tempLow is 0, why?
        it('should return a valid threshold violation message when the temp high threshold is crossed', () => {
            
            const msg = { 
                time: new Date().toISOString(),
                topic: SENSOR_RESPONSE,
                sensorID: TEMP_HUMIDITY_SENSOR,
                type: TEMP,
                fahrenheit: 100,
                currentPollInterval: 5
             }
            const workerData = {
                tempHigh: 1
            }
    
            const toTest = onSensorResponse(msg, workerData)
    
            expect(isValidMessage(toTest)).to.be.true
        })
    
        it('should return a valid threshold violation message when the humid low threshold is crossed', () => {
            
            const msg = { 
                time: new Date().toISOString(),
                topic: SENSOR_RESPONSE,
                sensorID: TEMP_HUMIDITY_SENSOR,
                type: HUMIDITY,
                percent: 1,
                currentPollInterval: 5
             }
            const workerData = {
                humidLow: 100
            }
    
            const toTest = onSensorResponse(msg, workerData)
    
            expect(isValidMessage(toTest)).to.be.true
        })
    
        it('should return a valid threshold violation message when the humid high threshold is crossed', () => {
            
            const msg = { 
                time: new Date().toISOString(),
                topic: SENSOR_RESPONSE,
                sensorID: TEMP_HUMIDITY_SENSOR,
                type: HUMIDITY,
                percent: 100,
                currentPollInterval: 5
             }
            const workerData = {
                humidHigh: 1
            }
    
            const toTest = onSensorResponse(msg, workerData)
    
            expect(isValidMessage(toTest)).to.be.true
        })
    
        it('should return false when the moisture low threshold is not crossed', () => {
            
            const msg = { 
                time: new Date().toISOString(),
                topic: SENSOR_RESPONSE,
                sensorID: MOISTURE_SENSOR_1,
                type: MOISTURE,
                moistureLevel: 500,
                currentPollInterval: 5
             }
            const workerData = {
                moistureLow: 300
            }
    
            const toTest = onSensorResponse(msg, workerData)
    
            expect(toTest).to.be.false
        })
    
        it('should return falsewhen the temp low threshold is not crossed', () => {
            
            const msg = { 
                time: new Date().toISOString(),
                topic: SENSOR_RESPONSE,
                sensorID: TEMP_HUMIDITY_SENSOR,
                type: TEMP,
                fahrenheit: 350,
                currentPollInterval: 5
             }
            const workerData = {
                tempLow: 300
            }
    
            const toTest = onSensorResponse(msg, workerData)
    
            expect(toTest).to.be.false
        })
    
        it('should return false when the temp high threshold is not crossed', () => {
            
            const msg = { 
                time: new Date().toISOString(),
                topic: SENSOR_RESPONSE,
                sensorID: TEMP_HUMIDITY_SENSOR,
                type: TEMP,
                fahrenheit: 100,
                currentPollInterval: 5
             }
            const workerData = {
                tempHigh: 150
            }
    
            const toTest = onSensorResponse(msg, workerData)
    
            expect(toTest).to.be.false
        })
    
        it('should return false when the humid low threshold is crossed', () => {
            
            const msg = { 
                time: new Date().toISOString(),
                topic: SENSOR_RESPONSE,
                sensorID: TEMP_HUMIDITY_SENSOR,
                type: HUMIDITY,
                percent: 150,
                currentPollInterval: 5
             }
            const workerData = {
                humidLow: 100
            }
    
            const toTest = onSensorResponse(msg, workerData)
    
            expect(toTest).to.be.false
        })
    
        it('should return false when the humid high threshold is not crossed', () => {
            
            const msg = { 
                time: new Date().toISOString(),
                topic: SENSOR_RESPONSE,
                sensorID: TEMP_HUMIDITY_SENSOR,
                type: HUMIDITY,
                percent: 50,
                currentPollInterval: 5
             }
            const workerData = {
                humidHigh: 100
            }
    
            const toTest = onSensorResponse(msg, workerData)
    
            expect(toTest).to.be.false
        })
    
        it('should return false when given an invalid msg argument', () => {
            const msg = {}
    
            const workerData = {
                moistureLow: 100
            }
    
            const toTest = onSensorResponse(msg, workerData)
    
            expect(toTest).to.be.false
        })
    
        it('should return false when given an invalid workerData argument', () => {
            const msg = {
                type: MOISTURE,
                moistureLevel: 100
            }
    
            const workerData = {} 
    
            const toTest = onSensorResponse(msg, workerData)
    
            expect(toTest).to.be.false
        })
    })
    
    describe('isAThresholdViolation(msg, workerData)', () => {
    
        it('should return the moistureLow threshold level when that is crossed', () => {
            
            const msg = {
                type: MOISTURE,
                moistureLevel: 200
            }
    
            const workerData = {
                moistureLow: 300
            }
    
            const expected = 300
    
            const toTest = isAThresholdViolation(msg, workerData)
    
            expect(toTest).to.equal(expected)
        })
    
        it('should return the tempLow threshold level when that is crossed', () => {
    
            const msg = {
                type: TEMP,
                fahrenheit: 50
            }
    
            const workerData = {
                tempLow: 60
            }
    
            const expected = 60
    
            const toTest = isAThresholdViolation(msg, workerData)
    
            expect(toTest).to.equal(expected)
        })
    
        it('should return the tempHigh threshold level when that is crossed', () => {
    
            const msg = {
                type: TEMP,
                fahrenheit: 50
            }
    
            const workerData = {
                tempHigh: 20
            }
    
            const expected = 20
    
            const toTest = isAThresholdViolation(msg, workerData)
    
            expect(toTest).to.equal(expected)
        })
    
        it('should return the humidLow threshold level when that is crossed', () => {
    
            const msg = {
                type: HUMIDITY,
                percent: 50
            }
    
            const workerData = {
                humidLow: 60
            }
    
            const expected = 60
    
            const toTest = isAThresholdViolation(msg, workerData)
    
            expect(toTest).to.equal(expected)
        })
    
        it('should return the humidHigh threshold level when that is crossed', () => {
    
            const msg = {
                type: HUMIDITY,
                percent: 50
            }
    
            const workerData = {
                humidHigh: 20
            }
    
            const expected = 20
    
            const toTest = isAThresholdViolation(msg, workerData)
    
            expect(toTest).to.equal(expected)
        })
    
        it('should return false when the moistureLow threshold is NOT crossed', () => {
    
            const msg = {
                type: MOISTURE,
                moistureLevel: 350
            }
    
            const workerData = {
                moistureLow: 300
            }
    
            expect(isAThresholdViolation(msg, workerData)).to.be.false
        })
    
        it('should return false when the tempLow threshold is NOT crossed', () => {
    
            const msg = {
                type: TEMP,
                fahrenheit: 50
            }
    
            const workerData = {
                tempLow: 40
            }
    
            expect(isAThresholdViolation(msg, workerData)).to.be.false
        })
    
        it('should return false when the tempHigh threshold is NOT crossed', () => {
    
            const msg = {
                type: TEMP,
                fahrenheit: 50
            }
    
            const workerData = {
                tempHigh: 100
            }
    
            expect(isAThresholdViolation(msg, workerData)).to.be.false
        })
    
        it('should return false when the humidLow threshold is NOT crossed', () => {
    
            const msg = {
                type: HUMIDITY,
                percent: 50
            }
    
            const workerData = {
                humidLow: 40
            }
    
            expect(isAThresholdViolation(msg, workerData)).to.be.false
        })
    
        it('should return false when the humidHigh threshold is NOT crossed', () => {
    
            const msg = {
                type: HUMIDITY,
                percent: 50
            }
    
            const workerData = {
                humidHigh: 60
            }
    
            expect(isAThresholdViolation(msg, workerData)).to.be.false
        })
    
        it('should return false when moisture level is equal to the moisture low threshold', () => {
    
            const msg = {
                type: MOISTURE,
                moistureLevel: 50
            }
    
            const workerData = {
                moistureLow: 50
            }
    
            expect(isAThresholdViolation(msg, workerData)).to.be.false
        })
    
        it('should return false when temp in fahrenheit is equal to the temp low threshold', () => {
    
            const msg = {
                type: TEMP,
                fahrenheit: 50
            }
    
            const workerData = {
                tempLow: 50
            }
    
            expect(isAThresholdViolation(msg, workerData)).to.be.false
        })
    
        it('should return false when temp in fahrenheit is equal to the temp high threshold', () => {
    
            const msg = {
                type: TEMP,
                fahrenheit: 50
            }
    
            const workerData = {
                tempLow: 50
            }
    
            expect(isAThresholdViolation(msg, workerData)).to.be.false
        })
    
        it('should return false when humidity percentage is equal to the humid low threshold', () => {
    
            const msg = {
                type: HUMIDITY,
                percent: 50
            }
    
            const workerData = {
                humidLow: 50
            }
    
            expect(isAThresholdViolation(msg, workerData)).to.be.false
        })
    
        it('should return false when humidity percentage is equal to the humid high threshold', () => {
    
            const msg = {
                type: HUMIDITY,
                percent: 50
            }
    
            const workerData = {
                humidHigh: 50
            }
    
            expect(isAThresholdViolation(msg, workerData)).to.be.false
        })
    
        it('should return false when given an invalid msg argument', () => {
    
            const msg = {}
    
            const workerData = {
                humidLow: 50,
                humidHigh: 100,
                tempLow: 20,
                tempHigh: 100,
                moistureLow: 300
            }
    
            expect(isAThresholdViolation(msg, workerData)).to.be.false
        })
    
        it('should return false when given an invalid workerData argument', () => {
    
            const msg = {
                type: MOISTURE,
                moistureLevel: 300
            }
    
            const workerData = {}
    
            expect(isAThresholdViolation(msg, workerData)).to.be.false
        })
    })
    
    describe('convertToThresholdViolationMessage(msg, threshold)', () => {
    
        it('should return a valid threshold violation message', () => {
    
            const msg = { 
                time: new Date().toISOString(),
                topic: SENSOR_RESPONSE,
                sensorID: TEMP_HUMIDITY_SENSOR,
                type: HUMIDITY,
                percent: 50,
                currentPollInterval: 5
             }
    
             const threshold = 40
    
             const toTest = convertToThresholdViolationMessage(msg, threshold)
    
             expect(isValidMessage(toTest)).to.be.true
        })
    
        it('should do nothing when given an invalid msg argument', () => {
            
            const msg = {}
    
            const threshold = 40
    
            const toTest = convertToThresholdViolationMessage(msg, threshold)
    
            expect(toTest).to.be.undefined
        })
    
        it('should return a threshold violation message with matching moisture levels', () => {
    
            const msg = {
                time: new Date().toISOString(),
                topic: SENSOR_RESPONSE,
                sensorID: MOISTURE_SENSOR_1,
                type: MOISTURE,
                moistureLevel: 100,
                currentPollInterval: 5
            }
    
            const threshold = 10
    
            const toTest = convertToThresholdViolationMessage(msg, threshold)
    
            expect(toTest.currentLevel).to.equal(msg.moistureLevel)
        })
    
        it('should return a threshold violation message with matching temps', () => {
    
            const msg = {
                time: new Date().toISOString(),
                topic: SENSOR_RESPONSE,
                sensorID: TEMP_HUMIDITY_SENSOR,
                type: TEMP,
                fahrenheit: 100,
                currentPollInterval: 5
            }
    
            const threshold = 10
    
            const toTest = convertToThresholdViolationMessage(msg, threshold)
    
            expect(toTest.currentLevel).to.equal(msg.fahrenheit)
        })
    
        it('should return a threshold violation message with matching humidity percentages', () => {
    
            const msg = {
                time: new Date().toISOString(),
                topic: SENSOR_RESPONSE,
                sensorID: TEMP_HUMIDITY_SENSOR,
                type: HUMIDITY,
                percent: 100,
                currentPollInterval: 5
            }
    
            const threshold = 10
    
            const toTest = convertToThresholdViolationMessage(msg, threshold)
    
            expect(toTest.currentLevel).to.equal(msg.percent)
        })
    
        it('should return a threshold violation message with a matching timestamp from the message passed in', () => {
    
            const msg = {
                time: new Date().toISOString(),
                topic: SENSOR_RESPONSE,
                sensorID: TEMP_HUMIDITY_SENSOR,
                type: HUMIDITY,
                percent: 100,
                currentPollInterval: 5
            }
    
            const threshold = 10
    
            const toTest = convertToThresholdViolationMessage(msg, threshold)
    
            expect(toTest.time).to.equal(msg.time)
        })
    })
})