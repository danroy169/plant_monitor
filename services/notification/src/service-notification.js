import { THRESHOLD_VIOLATION, MESSAGE, URL, EMAIL_RESPONSE, EMAIL_REQUEST } from '../../../util/consts.js'
import mqtt from 'async-mqtt'
import { parentPort } from 'worker_threads'
import getEmailRequestMessage from './notification-lib.js'

const { connectAsync } = mqtt

async function run() {
    const client = await connectAsync(URL)

    await client.subscribe(EMAIL_RESPONSE)

    parentPort.on(MESSAGE, msg => {
        if (msg.topic === THRESHOLD_VIOLATION) {

            const emailRequestMessage = getEmailRequestMessage(msg)

            if (emailRequestMessage) { client.publish(EMAIL_REQUEST, emailRequestMessage, () => { }) }
        }
    })
}

run()