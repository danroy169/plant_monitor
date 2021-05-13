import i2c from 'i2c-bus'
import sleep from 'sleep'

const TOUCH_BASE = 0x0F
const TOUCH_CHANNEL_OFFSET = 0x10

export async function getMoisture(i2cAddress, busNumber) {

	const readBufferCache = Buffer.alloc(2)

	const bus = await i2c.openPromisified(busNumber)

	await bus.i2cWrite(i2cAddress, 2, Buffer.from([TOUCH_BASE, TOUCH_CHANNEL_OFFSET]))

	sleep.msleep(5)

	const returnValue = await bus.i2cRead(i2cAddress, 2, readBufferCache)

	return convertBufferSourceToMoisture(returnValue.buffer)
 
}

function convertBufferSourceToMoisture(buf) {
	const dv = ArrayBuffer.isView(buf) ?
		new DataView(buf.buffer, buf.byteOffset, buf.byteLength) :
		new DataView(buf)

	return dv.getUint16(0, false)
}



