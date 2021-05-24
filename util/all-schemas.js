const configRequest = {
    '$schema': 'http://json-schema.org/draft-07/schema',
    'title': 'Sensor Reading',
    'description': 'A configuration message sent to a sensor or service',
    'type': 'object',
    'properties': {
        'topic': {
            'description': 'topic of the message',
            'type': 'string',
            'enum': ['config-request']
        },
        'target': {
            'description': 'The unique identifier for the service that\'s being sent the message',
            'type': 'string',
            'enum': [
                'urn:Temp-Sensor-Worker',
                'urn:Threshold-Worker',
                'urn:Moisture-Sensor-Worker'
            ]
        },
        'setting': {
            'description': 'The configuration setting to set',
            'type': 'string'
        },
        'data': {
            'description': 'The value to set the configuration to',
            'type': 'integer'
        },
        'time': {
            'description': 'ISO 8601 format time stamp',
            'type': 'string',
            'format': 'date-time'
        }
    },
    'allOf': [
        {
            'if': {
                'properties': {
                    'target': {
                        'const': 'urn:Threshold-Worker'
                    }
                }
            },
            'then': {
                'properties': {
                    'setting': {
                        'enum': [
                            'moisture-low',
                            'temp-low',
                            'temp-high',
                            'humid-low',
                            'humid-high'
                        ]
                    }
                }
            }
        },
        {
            'if': {
                'properties': {
                    'target': {
                        'enum': [
                            'urn:Temp-Sensor-Worker',
                            'urn:Moisture-Sensor-Worker'
                        ]
                    }
                }
            },
            'then': {
                'properties': {
                    'setting': {
                        'enum': [
                            'pollInterval'
                        ]
                    }
                }
            }
        }
    ],
    'required': ['target', 'setting', 'data', 'time']
}

const configResponse = {
    '$schema': 'http://json-schema.org/draft-07/schema',
    'title': 'Config Result',
    'description': 'A message sent after an attempt at configuration',
    'type': 'object',
    'properties': {
        'topic': {
            'description': 'topic of the message',
            'type': 'string',
            'enum': ['config-response']
        },
        'target': {
            'description': 'The unique identifier for the service',
            'type': 'string',
            'enum': ['urn:Temp-Sensor-Worker',
                'urn:Threshold-Worker',
                'urn:Moisture-Sensor-Worker']
        },
        'result': {
            'description': 'The result of the configuration attempt',
            'type': 'boolean'
        },
        'time': {
            'description': 'ISO 8601 format time stamp',
            'type': 'string',
            'format': 'date-time'
        }
    },
    'required': ['target', 'result', 'time']
}

const dataRequest = {
    '$schema': 'http://json-schema.org/draft-07/schema',
    'title': 'Data Lookup Request',
    'description': 'A message sent to metric service requesting historical reading data',
    'type': 'object',
    'properties': {
        'topic': {
            'description': 'topic of the message',
            'type': 'string',
            'enum': ['data-request']
        },
        'metric': {
            'description': 'The metric being requested',
            'type': 'string',
            'enum': ['moisture1', 'moisture2', 'temp', 'humidity']
        },
        'numberOfReadings': {
            'description': 'The number of reading objects requested',
        },
        'time': {
            'description': 'ISO 8601 format time stamp',
            'type': 'string',
            'format': 'date-time'
        },
        'id': {
            'type': 'string',
            'format': 'uuid'
        }
    },
    'required': ['metric', 'numberOfReadings', 'time']
}

const dataResponse = {
    '$schema': 'http://json-schema.org/draft-07/schema',
    'title': 'Data Lookup Response',
    'description': 'A message sent in response to lookup request, containing data asked for',
    'type': 'object',
    'properties': {
        'topic': {
            'description': 'topic of the message',
            'type': 'string',
            'enum': ['data-response']
        },
        'metric': {
            'description': 'The metric that was requested',
            'type': 'string',
            'enum': ['moisture1', 'moisture2', 'temp', 'humidity']
        },
        'result': {
            'description': 'An array of data results',
            'type': 'array',
            'uniqueItems': true
        },
        'time': {
            'description': 'ISO 8601 format time stamp',
            'type': 'string',
            'format': 'date-time'
        },
        'id': {
            'type': 'string',
            'format': 'uuid'
        }
    },
    'required': ['topic', 'metric', 'result', 'time']
}

const emailRequest = {
    '$schema': 'http://json-schema.org/draft-07/schema',
    'title': 'Send Email Request',
    'description': 'A message sent to email service requesting an email be sent',
    'type': 'object',
    'properties': {
        'topic': {
            'description': 'topic of the message',
            'type': 'string',
            'enum': ['email-request']
        },
        'sensorID': {
            'description': 'The unique identifier for a sensor',
            'type': 'string'
        },
        'violationType': {
            'description': 'The metric that crossed a threshold',
            'type': 'string',
            'enum': ['moisture', 'temp', 'humidity']
        },
        'threshold': {
            'description': 'The threshold level crossed',
            'type': 'integer'
        },
        'currentLevel': {
            'description': 'The current level of the metric that caused threshold violation',
            'type': 'integer'
        },
        'time': {
            'description': 'ISO 8601 format time stamp',
            'type': 'string',
            'format': 'date-time'
        }
    },
    'required': ['sensorID', 'violationType', 'threshold', 'time']
}

const emailResponse = {
    '$schema': 'http://json-schema.org/draft-07/schema',
    'title': 'Send Email Result',
    'description': 'A message sent from email service indicating pass/fail',
    'type': 'object',
    'properties': {
        'topic': {
            'description': 'topic of the message',
            'type': 'string',
            'enum': ['email-response']
        },
        'result': {
            'description': 'The result of send email attempt',
            'type': 'boolean'
        },
        'time': {
            'description': 'ISO 8601 format time stamp',
            'type': 'string',
            'format': 'date-time'
        }
    },
    'required': ['result', 'time']
}

const sensorRequest = {
    '$schema': 'http://json-schema.org/draft-07/schema',
    'title': 'Sensor Request',
    'description': 'A request to a sensor to get a reading',
    'type': 'object',
    'properties': {
        'topic': {
            'description': 'topic of the message',
            'type': 'string',
            'enum': ['sensor-request']
        },
        'sensorID': {
            'description': 'The unique identifier for a sensor',
            'type': 'string',
            'enum': ['moisture1', 'moisture2', 'temp-humidity']
        },
        'type': {
            'description': 'The type of data to read from the sensor',
            'type': 'string',
            'enum': ['moisture', 'temp', 'humidity']
        },
        'time': {
            'description': 'ISO 8601 format time stamp',
            'type': 'string',
            'format': 'date-time'
        }
    },
    'required': ['sensorID', 'type', 'time']
}

const sensorResponse = {
    '$schema': 'http://json-schema.org/draft-07/schema',
    'title': 'Sensor Response',
    'description': 'A reading from a sensor',
    'type': 'object',
    'properties': {
        'topic': {
            'description': 'topic of the message',
            'type': 'string',
            'enum': ['sensor-response']
        },
        'sensorID': {
            'description': 'The unique identifier for a sensor',
            'type': 'string',
            'enum': ['moisture1', 'moisture2', 'temp-humidity']
        },
        'time': {
            'description': 'ISO 8601 format time stamp',
            'type': 'string',
            'format': 'date-time'
        },
        'type': {
            'description': 'defines the type of reading',
            'type': 'string',
            'enum': ['moisture', 'temp', 'humidity']
        },
        'currentPollInterval': {
            'description': 'Time interval in which the sensor reads and sends data',
            'type': 'integer'
        }
    },
    'allOf': [
        {
            'if': {
                'properties': { 'type': { 'const': 'moisture' } }
            },
            'then': {
                'properties': { 'moistureLevel': { 'type': 'integer', 'maximum': 2000 } },
                'required': ['moistureLevel']
            }
        },
        {
            'if': {
                'properties': { 'type': { 'const': 'temp' } }
            },
            'then': {
                'properties': { 'fahrenheit': { 'type': 'integer' } },
                'required': ['fahrenheit']
            }
        },
        {
            'if': {
                'properties': { 'type': { 'const': 'humidity' } }
            },
            'then': {
                'properties': { 'percent': { 'type': 'integer' } },
                'required': ['percent']
            }
        }
    ],
    'required': ['sensorID', 'time', 'type', 'currentPollInterval']
}

const thresholdViolation = {
    '$schema': 'http://json-schema.org/draft-07/schema',
    'title': 'Threshold Violation',
    'description': 'A message sent to indicating that a threshold has been crossed',
    'type': 'object',
    'properties': {
        'topic': {
            'description': 'topic of the message',
            'type': 'string',
            'enum': ['threshold-violation']
        },
        'sensorID': {
            'description': 'The unique identifier for a sensor',
            'type': 'string'
        },
        'violationType': {
            'description': 'Indicates what metric had the threshold violation',
            'type': 'string',
            'enum': ['moisture', 'temp', 'humidity']
        },
        'threshold': {
            'description': 'The value of the threshold crossed',
            'type': 'integer'
        },
        'currentLevel': {
            'description': 'The value that caused the violation',
            'type': 'integer'
        },
        'time': {
            'description': 'ISO 8601 format time stamp',
            'type': 'string',
            'format': 'date-time'
        }
    },
    'required': ['sensorID', 'violationType', 'threshold', 'currentLevel', 'time']
}

export const schemas = [configRequest, configResponse, dataRequest, dataResponse,
    emailRequest, emailResponse, sensorRequest, sensorResponse, thresholdViolation]