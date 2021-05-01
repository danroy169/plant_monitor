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
const MOISTURE_SENSOR_SERVICE = 'service-moisture-sensor'
const TEMP_SENSOR_SERVICE = 'service-temp-sensor'
const ONLINE = 'online'
const MESSAGE = 'message'

const URL = 'mqtt:localhost:8883'
const PORT = 8883

const TOPICS = ['config-request', 'config-response', 'data-request', 'data-response', 'email-request', 'email-response', 'sensor-request', 'sensor-response', 'threshold-violation']

const MOISTURE = 'moisture'
const TEMP = 'temp'
const HUMIDITY = 'humidity'

const MOISTURE_SENSOR_1 = 'moisture1'
const MOISTURE_SENSOR_2 = 'moisture2'
const TEMP_HUMIDITY_SENSOR = 'temp-humidity'

const SECONDS_TO_MILLI = 1000


export {SENSOR_REQUEST, SENSOR_RESPONSE, CONFIG_REQUEST, CONFIG_RESPONSE, DATA_REQUEST, DATA_RESPONSE, 
        EMAIL_REQUEST, EMAIL_RESPONSE, THRESHOLD_VIOLATION, URL, PORT, TOPICS, MOISTURE, TEMP, HUMIDITY,
        MOISTURE_SENSOR_1, SECONDS_TO_MILLI, POLL_INTERVAL, TEMP_SENSOR_SERVICE, MOISTURE_SENSOR_SERVICE, ONLINE, MESSAGE, MOISTURE_SENSOR_2, TEMP_HUMIDITY_SENSOR}
