const i2c = require('i2c-bus');


const SENSOR_I2C_ADDRESS = 0x36;
const I2C_BUS_NUMBER = 1;
// const TOUCH_BASE = 0x0F;
// const TOUCH_CHANNEL_OFFSET = 0x10;

const readBufferCache = Buffer.alloc(4);

async function main(){
  const bus = await i2c.openPromisified(I2C_BUS_NUMBER);

  await bus.i2cWrite(SENSOR_I2C_ADDRESS, 2, Buffer.from([ 0x00, 0x02 ]));

  const returnValue = await bus.i2cRead(SENSOR_I2C_ADDRESS, 4, readBufferCache);

  //console.log(returnValue.buffer.toJSON()); { bytesRead: 4, buffer: <Buffer 0f ba 27 8f> }

  const version = convertBufferToVersion(returnValue.buffer);

  const version2 = convertArrayBufferToVersion(returnValue.buffer.buffer);

  const version3 = convertArrayBufferToVersion2(returnValue.buffer.buffer);

  const version4 = convertBufferSourceToVersion(returnValue.buffer.buffer);

  console.log({ version, version2, version3, version4 });
}
main();


  
// quick dirty buffer version
function convertBufferToVersion(buffer) {
  return buffer.readUInt32BE(0)
}


// proper - fail
function convertArrayBufferToVersion(aBuffer) {
  const a = new Uint32Array(aBuffer);
  return a[0]
  // assumes BE platform (incorrectly)
}

// structural fail - not flexible
function convertArrayBufferToVersion2(aBuffer) {
  const dv = new DataView(aBuffer);
  return dv.getUint32(0, false);
}

function convertBufferSourceToVersion(bs){
  const dv = ArrayBuffer.isView(bs) ? 
    new DataView(bs.buffer, bs.byteOffset, bs.byteLength) :
    new DataView(bs)

  return dv.getUint32(0, false);
}