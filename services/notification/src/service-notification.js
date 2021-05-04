import { THRESHOLD_VIOLATION, MESSAGE, EMAIL_REQUEST, URL, EMAIL_RESPONSE } from '../../../util/consts.js'
import { connect } from 'async-mqtt'
import { parentPort } from 'worker_threads'
import isValidMessage from '../../../util/validator.js'

const client = connect(URL)

client.subscribe(EMAIL_RESPONSE)

parentPort.on(MESSAGE, msg => {
    if(msg.topic === THRESHOLD_VIOLATION) {
        console.log('Notification service recieved threshold violation message\n')

        postEmailRequest(msg)
    }
})

function postEmailRequest(msg) {
    const emailRequestMessage = msg
    emailRequestMessage.topic = EMAIL_REQUEST

    if(isValidMessage(emailRequestMessage)) { client.publish(EMAIL_REQUEST, JSON.stringify(emailRequestMessage)); console.log('Email request message sent\n') }
}