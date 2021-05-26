import { THRESHOLD_VIOLATION, MESSAGE, URL, EMAIL_RESPONSE, EMAIL_REQUEST } from '../../../util/consts.js'
import { connect } from 'async-mqtt'
import { parentPort } from 'worker_threads'
import getEmailRequestMessage from './notification-lib.js'

const client = connect(URL)

client.subscribe(EMAIL_RESPONSE)

parentPort.on(MESSAGE, msg => {
    if(msg.topic === THRESHOLD_VIOLATION) {

        const emailRequestMessage = getEmailRequestMessage(msg)

        if(emailRequestMessage) { client.publish(EMAIL_REQUEST, emailRequestMessage, () => {}) }
    }
})

