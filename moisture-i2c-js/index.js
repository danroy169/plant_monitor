const i2c = require('i2c-bus');
const sleep = require("sleep")


const SENSOR_I2C_ADDRESS = 0x36;
const I2C_BUS_NUMBER = 1;
const TOUCH_BASE = 0x0F;
const TOUCH_CHANNEL_OFFSET = 0x10;



async function get_moisture(){

  const readBufferCache = Buffer.alloc(2);

  const bus = await i2c.openPromisified(I2C_BUS_NUMBER);

  await bus.i2cWrite(SENSOR_I2C_ADDRESS, 2, Buffer.from([ TOUCH_BASE, TOUCH_CHANNEL_OFFSET ]));

  sleep.msleep(5);

  const returnValue = await bus.i2cRead(SENSOR_I2C_ADDRESS, 2, readBufferCache);

  console.log(convertBufferSourceToMoisture(returnValue.buffer));

}

get_moisture()


function convertBufferSourceToMoisture(buf){
  const dv = ArrayBuffer.isView(buf) ?
    new DataView(buf.buffer, buf.byteOffset, buf.byteLength) :
    new DataView(buf)

  return dv.getUint16(0, false);
}







// // quick dirty buffer version
// function convertBufferToVersion(buffer) {
//   return buffer.readUInt32BE(0)
// }


// // proper - fail
// function convertArrayBufferToVersion(aBuffer) {
//   const a = new Uint32Array(aBuffer);
//   return a[0]
//   // assumes BE platform (incorrectly)
// }

// // structural fail - not flexible
// function convertArrayBufferToVersion2(aBuffer) {
//   const dv = new DataView(aBuffer);
//   return dv.getUint32(0, false);
// }

// function convertBufferSourceToVersion(bs){
//   const dv = ArrayBuffer.isView(bs) ? 
//     new DataView(bs.buffer, bs.byteOffset, bs.byteLength) :
//     new DataView(bs)

//   return dv.getUint32(0, false);
// }