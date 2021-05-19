import { v4 as uuidv4 } from 'uuid'
import { DEFAULT_GLOBAL_TIMEOUT_MS, resolveCacheMap } from '../../../util/consts.js'




export function createTransaction(req, msgToBeSent, parentPort, timeoutMS = DEFAULT_GLOBAL_TIMEOUT_MS) {

    const thisTransactionID = uuidv4()

    return new Promise((resolve, reject) => {

        const timeoutID = setTimeout(() => {
            resolveCacheMap.delete(thisTransactionID)

            reject(new Error('Timed out'))
        }, timeoutMS)

        resolveCacheMap.set(thisTransactionID, { resolve, reject, timeoutID })

        parentPort.postMessage({ ...msgToBeSent, id: thisTransactionID })
    })
}