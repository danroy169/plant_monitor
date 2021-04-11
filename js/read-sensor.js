async function get_moisture() {

    const readBufferCache = Buffer.alloc(2);
  
    const bus = await i2c.openPromisified(I2C_BUS_NUMBER);
  
    await bus.i2cWrite(SENSOR_I2C_ADDRESS, 2, Buffer.from([TOUCH_BASE, TOUCH_CHANNEL_OFFSET]));
  
    sleep.msleep(5);
  
    const returnValue = await bus.i2cRead(SENSOR_I2C_ADDRESS, 2, readBufferCache);
  
    return convertBufferSourceToMoisture(returnValue.buffer);
  
  }
  
  
  function convertBufferSourceToMoisture(buf) {
    const dv = ArrayBuffer.isView(buf) ?
      new DataView(buf.buffer, buf.byteOffset, buf.byteLength) :
      new DataView(buf)
  
    return dv.getUint16(0, false);
  }

  export default {get_moisture}