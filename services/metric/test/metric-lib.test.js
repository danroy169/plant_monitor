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
})