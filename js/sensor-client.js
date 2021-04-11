const i2c = require('i2c-bus');
const sleep = require("sleep");
const MQTT = require("async-mqtt");


const SENSOR_I2C_ADDRESS = 0x36;
const I2C_BUS_NUMBER = 1;
const TOUCH_BASE = 0x0F;
const TOUCH_CHANNEL_OFFSET = 0x10;

const client = MQTT.connect("mqtt:localhost:8883");



const publishMoisture = async () => {
  console.log("Starting");

  const time = new Date().toLocaleTimeString()
  const date = new Date().toLocaleDateString()

  try {
    const reading = {
      moisture: await get_moisture(),
      date,
      time
    }

    console.log(reading);

    const payload = JSON.stringify(reading);

    await client.publish("moisture", payload);

    await client.end();

    console.log("Done");

  } catch (e) {

    console.log(e.stack);

    process.exit();
  }
}

client.on("connect", publishMoisture);













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