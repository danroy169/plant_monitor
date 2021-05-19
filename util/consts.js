const SENSOR_RESPONSE = 'sensor-response'
const SENSOR_REQUEST = 'sensor-request'
const CONFIG_RESPONSE = 'config-response'
const CONFIG_REQUEST = 'config-request'
const DATA_RESPONSE = 'data-response'
const DATA_REQUEST = 'data-request'
const EMAIL_RESPONSE = 'email-response'
const EMAIL_REQUEST = 'email-request'
const THRESHOLD_VIOLATION = 'threshold-violation'
const POLL_INTERVAL = 'pollInterval'
const THRESHOLD_SERVICE = 'service-threshold'
const MOISTURE_SENSOR_SERVICE = 'service-moisture-sensor'
const TEMP_SENSOR_SERVICE = 'service-temp-sensor'
const ONLINE = 'online'
const MESSAGE = 'message'
const ALL = 'all'
const AVERAGE = 'average'
const MIN_MAX = 'minMax'

const MOISTURE_LOW = 'moisture-low'
const TEMP_LOW = 'temp-low'
const TEMP_HIGH = 'temp-high'
const HUMID_LOW = 'humid-low'
const HUMID_HIGH = 'humid-high'

const URL = 'mqtt:localhost:8883'
const PORT = 8883

const TOPICS = ['config-request', 'config-response', 'data-request', 'data-response', 'email-request', 'email-response', 'sensor-request', 'sensor-response', 'threshold-violation']

const MOISTURE = 'moisture'
const TEMP = 'temp'
const HUMIDITY = 'humidity'

const MOISTURE_SENSOR_1 = 'moisture1'
const MOISTURE_SENSOR_2 = 'moisture2'
const TEMP_HUMIDITY_SENSOR = 'temp-humidity'

const resolveCacheMap = new Map()

const SECONDS_TO_MILLI = 1000
const DEFAULT_GLOBAL_TIMEOUT_MS = 1000

const SENSOR1_I2C_ADDRESS = 0x36
const SENSOR1_I2C_BUS_NUMBER = 1

const SENSOR2_I2C_ADDRESS = 0x37
const SENSOR2_I2C_BUS_NUMBER = 2

const THRESHOLDS = {
    moistureLow: 275,
    tempLow: 60,
    tempHigh: 85,
    humidLow: 20,
    humidHigh: 75
}


export {
    SENSOR_REQUEST, SENSOR_RESPONSE, CONFIG_REQUEST, CONFIG_RESPONSE, DATA_REQUEST, DATA_RESPONSE,
    EMAIL_REQUEST, EMAIL_RESPONSE, THRESHOLD_VIOLATION, URL, PORT, TOPICS, MOISTURE, TEMP, HUMIDITY,
    MOISTURE_SENSOR_1, SECONDS_TO_MILLI, POLL_INTERVAL, TEMP_SENSOR_SERVICE, MOISTURE_SENSOR_SERVICE, 
    ONLINE, MESSAGE, MOISTURE_SENSOR_2, TEMP_HUMIDITY_SENSOR, THRESHOLDS, MOISTURE_LOW,TEMP_LOW, TEMP_HIGH, 
    HUMID_LOW, HUMID_HIGH, THRESHOLD_SERVICE, ALL, SENSOR1_I2C_ADDRESS, SENSOR1_I2C_BUS_NUMBER, SENSOR2_I2C_ADDRESS,
    SENSOR2_I2C_BUS_NUMBER, AVERAGE, DEFAULT_GLOBAL_TIMEOUT_MS, resolveCacheMap, MIN_MAX
}
