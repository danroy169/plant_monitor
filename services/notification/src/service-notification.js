import { THRESHOLD_VIOLATION, MESSAGE, URL, EMAIL_RESPONSE } from '../../../util/consts.js'
import { connect } from 'async-mqtt'
import { parentPort } from 'worker_threads'
import postEmailRequest from './notification-lib.js'

const client = connect(URL)

client.subscribe(EMAIL_RESPONSE)

parentPort.on(MESSAGE, msg => {
    if(msg.topic === THRESHOLD_VIOLATION) {
        console.log('Notification service recieved threshold violation message\n')

        postEmailRequest(msg, client)
    }
})
