import isValidMessage from '../../../util/validator.js'
import { EMAIL_REQUEST } from '../../../util/consts.js'

export default function postEmailRequest(msg, client) {
    const emailRequestMessage = msg
    emailRequestMessage.topic = EMAIL_REQUEST

    if(isValidMessage(emailRequestMessage)) { client.publish(EMAIL_REQUEST, JSON.stringify(emailRequestMessage)); console.log('Email request message sent\n') }
}