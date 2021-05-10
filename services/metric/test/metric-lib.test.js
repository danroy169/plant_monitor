import { expect } from 'chai'
import { describe, it } from 'mocha'
import { HUMIDITY, MOISTURE_SENSOR_1, MOISTURE_SENSOR_2, TEMP } from '../../../util/consts.js'
import isValidMessage from '../../../util/validator.js'
import { storeData, onDataRequest, convertAllToLength } from '../src/metric-lib.js'

describe('storeData(msg, dataStore)', () => {
    it('should push a moisture1 reading into the proper array in the dataStore', () => {

        const dataStore = {
            moisture1Readings: []
        }

        const msg = {
            sensorID: MOISTURE_SENSOR_1
        }

        storeData(msg, dataStore)

        expect(dataStore.moisture1Readings).to.contain(msg)
    })

    it('should push a moisture2 reading into the proper array in the dataStore', () => {

        const dataStore = {
            moisture2Readings: []
        }

        const msg = {
            sensorID: MOISTURE_SENSOR_2
        }

        storeData(msg, dataStore)

        expect(dataStore.moisture2Readings).to.contain(msg)
    })

    it('should push a temp reading into the proper array in the dataStore', () => {

        const dataStore = {
            tempReadings: []
        }

        const msg = {
            type: TEMP
        }

        storeData(msg, dataStore)

        expect(dataStore.tempReadings).to.contain(msg)
    })

    it('should push a humidity reading into the proper array in the dataStore', () => {

        const dataStore = {
            humidReadings: []
        }

        const msg = {
            type: HUMIDITY
        }

        storeData(msg, dataStore)

        expect(dataStore.humidReadings).to.contain(msg)
    })

    it('should do nothing when given an invalid message', () => {
        const msg = {}

        const dataStore = {
            moisture1Readings: [],
            moisture2Readings: [],
            tempReadings: [],
            humidReadings: []
        }

        storeData(msg, dataStore)

        Object.values(dataStore).forEach(readingArray => {
            expect(readingArray).to.be.empty
        })
    })

    it('should throw an error when given an empty dataStore argument', () => {

        const dataStore = {}

        const msg = {
            sensorID: MOISTURE_SENSOR_1
        }

        expect(function(){ storeData(msg, dataStore) }).to.throw()
    })
})

describe('onDataRequest(msg, dataStore)', () => {

    it('should return a valid data-response message', () => {
        const dataRequestMessage = {
            numberOfReadings: 1,
            metric: MOISTURE_SENSOR_1
        }

        const dataStore = {
            moisture1Readings: [{ 
                time: new Date().toISOString(),
                topic: 'test',
                sensorID: 'test',
                type: 'test',
                currentPollInterval: 5
             }]
        }

        const dataResponseMessage = onDataRequest(dataRequestMessage, dataStore)

        expect(isValidMessage(dataResponseMessage)).to.be.true
    })

    it('should return false when given an invalid message argument', () => {
        const invalidMessage = {}

        const dataStore = {
            moisture1Readings: [{ 
                time: new Date().toISOString(),
                topic: 'test',
                sensorID: 'test',
                type: 'test',
                currentPollInterval: 5
             }]
        }

        const toTest = onDataRequest(invalidMessage, dataStore)

        expect(toTest).to.be.false
    })

    it('should throw an error when given an invalid dataStore argument', () => {
        const dataRequestMessage = {
            numberOfReadings: 1,
            metric: MOISTURE_SENSOR_1
        }

        const dataStore = {}

        expect(function(){ onDataRequest(dataRequestMessage, dataStore) }).to.throw() 
    })

    it('should return a dataResponseMessage object with the proper result property for moisture1', () => {
        const dataRequestMessage = {
            numberOfReadings: 1,
            metric: MOISTURE_SENSOR_1
        }

        const expected = { 
            time: new Date().toISOString(),
            topic: 'test',
            sensorID: 'test',
            type: 'test',
            currentPollInterval: 5
         }

        const dataStore = {
            moisture1Readings: [expected]
        }

        const dataResponseMessage = onDataRequest(dataRequestMessage, dataStore)

        expect(dataResponseMessage.result).to.contain(expected)
        
    })

    it('should return a dataResponseMessage object with the proper result property for moisture2', () => {
        const dataRequestMessage = {
            numberOfReadings: 1,
            metric: MOISTURE_SENSOR_2
        }

        const expected = { 
            time: new Date().toISOString(),
            topic: 'test',
            sensorID: 'test',
            type: 'test',
            currentPollInterval: 5
         }

        const dataStore = {
            moisture2Readings: [expected]
        }

        const dataResponseMessage = onDataRequest(dataRequestMessage, dataStore)

        expect(dataResponseMessage.result).to.contain(expected)
        
    })

    it('should return a dataResponseMessage object with the proper result property for temp', () => {
        const dataRequestMessage = {
            numberOfReadings: 1,
            metric: TEMP
        }

        const expected = { 
            time: new Date().toISOString(),
            topic: 'test',
            sensorID: 'test',
            type: 'test',
            currentPollInterval: 5
         }

        const dataStore = {
            tempReadings: [expected]
        }

        const dataResponseMessage = onDataRequest(dataRequestMessage, dataStore)

        expect(dataResponseMessage.result).to.contain(expected)
        
    })

    it('should return a dataResponseMessage object with the proper result property for humidity', () => {
        const dataRequestMessage = {
            numberOfReadings: 1,
            metric: HUMIDITY
        }

        const expected = { 
            time: new Date().toISOString(),
            topic: 'test',
            sensorID: 'test',
            type: 'test',
            currentPollInterval: 5
         }

        const dataStore = {
            humidReadings: [expected]
        }

        const dataResponseMessage = onDataRequest(dataRequestMessage, dataStore)

        expect(dataResponseMessage.result).to.contain(expected)
        
    })
})

describe('convertAllToLength(msg, dataStore', () => {

    it('should return the proper array length for moisture1', () => {
        const dataRequestMessage = {
            metric: MOISTURE_SENSOR_1
        }

        const dataStore = {
            moisture1Readings: []
        }

        const expected = 0

        const toTest = convertAllToLength(dataRequestMessage, dataStore)

        expect(toTest).to.equal(expected)
    })

    it('should return the proper array length for moisture2', () => {
        const dataRequestMessage = {
            metric: MOISTURE_SENSOR_2
        }

        const dataStore = {
            moisture2Readings: [{}]
        }

        const expected = 1

        const toTest = convertAllToLength(dataRequestMessage, dataStore)

        expect(toTest).to.equal(expected)
    })

    it('should return the proper array length for temp', () => {
        const dataRequestMessage = {
            metric: TEMP
        }

        const dataStore = {
            tempReadings: [{}, {}]
        }

        const expected = 2

        const toTest = convertAllToLength(dataRequestMessage, dataStore)

        expect(toTest).to.equal(expected)
    })

    it('should return the proper array length for humidity', () => {
        const dataRequestMessage = {
            metric: HUMIDITY
        }

        const dataStore = {
            humidReadings: [{}, {}, {}]
        }

        const expected = 3

        const toTest = convertAllToLength(dataRequestMessage, dataStore)

        expect(toTest).to.equal(expected)
    })

    it('should do nothing when given an invalid msg argument', () => {
        const dataRequestMessage = {}

        const dataStore = {
            humidReadings: [{}, {}, {}]
        }

        const toTest = convertAllToLength(dataRequestMessage, dataStore) 

        expect(toTest).to.be.undefined
    })

    it('should throw when given an invalid dataStore argument', () => {
        const dataRequestMessage = {
            metric: HUMIDITY
        }

        const dataStore = {} 

        expect(function(){ convertAllToLength(dataRequestMessage, dataStore) }).to.throw()
    })
})