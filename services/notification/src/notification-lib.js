import isValidMessage from '../../../util/validator.js'
import { EMAIL_REQUEST } from '../../../util/consts.js'

export default function getEmailRequestMessage(msg) {
    const emailRequestMessage = msg
    emailRequestMessage.topic = EMAIL_REQUEST

    if(isValidMessage(emailRequestMessage)) { 
        return JSON.stringify(emailRequestMessage) 
    }
}