import { THRESHOLD_VIOLATION, MESSAGE, EMAIL_REQUEST } from '../../../util/consts.js'
//import { THRESHOLD_VIOLATION, CONFIG_RESPONSE, EMAIL_REQUEST, EMAIL_RESPONSE, URL } from "/home/pi/Projects/Plant Monitor/js/consts.js"
import { parentPort } from 'worker_threads'
import isValidMessage  from '../../../util/validator.js'

parentPort.on(MESSAGE, msg => {
    if(msg.topic === THRESHOLD_VIOLATION) {
        console.log('Notification service recieved threshold violation message\n')

        postEmailRequest(msg)
    }
})



function postEmailRequest(msg) {
    const emailRequestMessage = msg
    emailRequestMessage.topic = EMAIL_REQUEST

    if(isValidMessage(emailRequestMessage)) { parentPort.postMessage(emailRequestMessage); console.log('Email request message sent\n') }
}