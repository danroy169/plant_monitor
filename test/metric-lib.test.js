import { expect } from 'chai'
import { describe, it } from 'mocha'
import { HUMIDITY, MOISTURE, MOISTURE_SENSOR_1, MOISTURE_SENSOR_2, TEMP } from '../util/consts.js'
import isValidMessage from '../util/validator.js'
import { storeData, onDataRequest, onAll, checkDate, getDailyAverageReading } from '../services/metric/src/metric-lib.js'

describe('metric service lib', () => {
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

            expect(function () { storeData(msg, dataStore) }).to.throw()
        })
    })

    describe('onDataRequest(msg, dataStore)', () => {

        it('should return a valid data-response message', () => {
            const dataRequestMessage = {
                numberOfReadings: 1,
                metric: MOISTURE_SENSOR_1,
                id: 1
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

            expect(function () { onDataRequest(dataRequestMessage, dataStore) }).to.throw()
        })

        it('should return a dataResponseMessage object with the proper result property for moisture1', () => {
            const dataRequestMessage = {
                numberOfReadings: 1,
                metric: MOISTURE_SENSOR_1,
                id: 1
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
                metric: MOISTURE_SENSOR_2,
                id: 1
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
                metric: TEMP,
                id: 1
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
                metric: HUMIDITY,
                id: 1
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

    describe('onAll(msg, dataStore)', () => {

        it('should return the proper array moisture1', () => {
            const dataRequestMessage = {
                metric: MOISTURE_SENSOR_1
            }

            const dataStore = {
                moisture1Readings: []
            }

            const expected = dataStore.moisture1Readings

            const toTest = onAll(dataRequestMessage, dataStore)

            expect(toTest).to.equal(expected)
        })

        it('should return the proper array for moisture2', () => {
            const dataRequestMessage = {
                metric: MOISTURE_SENSOR_2
            }

            const dataStore = {
                moisture2Readings: [{}]
            }

            const expected = dataStore.moisture2Readings

            const toTest = onAll(dataRequestMessage, dataStore)

            expect(toTest).to.equal(expected)
        })

        it('should return the proper array for temp', () => {
            const dataRequestMessage = {
                metric: TEMP
            }

            const dataStore = {
                tempReadings: [{}, {}]
            }

            const expected = dataStore.tempReadings

            const toTest = onAll(dataRequestMessage, dataStore)

            expect(toTest).to.equal(expected)
        })

        it('should return the proper array for humidity', () => {
            const dataRequestMessage = {
                metric: HUMIDITY
            }

            const dataStore = {
                humidReadings: [{}, {}, {}]
            }

            const expected = dataStore.humidReadings

            const toTest = onAll(dataRequestMessage, dataStore)

            expect(toTest).to.equal(expected)
        })

        it('should do nothing when given an invalid msg argument', () => {
            const dataRequestMessage = {}

            const dataStore = {
                humidReadings: [{}, {}, {}]
            }

            const toTest = onAll(dataRequestMessage, dataStore)

            expect(toTest).to.be.undefined
        })
    })

    describe('checkDate(reading)', () => {

        it('should return true given a reading with todays date', () => {

            const reading = {
                time: new Date().toISOString()
            }

            expect(checkDate(reading)).to.be.true
        })
    })

    it('should return false given a reading with not todays date', () => {

        const reading = {
            time: new Date('11/20/1923').toISOString()
        }

        expect(checkDate(reading)).to.be.false
    })

    describe('getDailyAverageReading(msg, dataStore', () => {

        it('should return a number', () => {
            const msg = {
                numberOfReadings: 1,
                metric: MOISTURE_SENSOR_1,
                id: 1
            }

            const dataStore = {
                moisture1Readings: [{
                    time: new Date().toISOString(),
                    metric: MOISTURE_SENSOR_1,
                    type: MOISTURE,
                    sensorID: 'sensor-response',
                    moistureLevel: 200,
                    currentPollInterval: 5
                },
                {
                    time: new Date().toISOString(),
                    metric: MOISTURE_SENSOR_1,
                    type: MOISTURE,
                    sensorID: 'sensor-response',
                    moistureLevel: 200,
                    currentPollInterval: 5
                },
                {
                    time: new Date().toISOString(),
                    metric: MOISTURE_SENSOR_1,
                    type: MOISTURE,
                    sensorID: 'sensor-response',
                    moistureLevel: 200,
                    currentPollInterval: 5
                }]
            }
            
            expect(getDailyAverageReading(msg, dataStore)).to.equal(200)
        })

    })
})

