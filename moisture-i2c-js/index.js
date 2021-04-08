const i2c = require('i2c-bus');


const SENSOR_I2C_ADDRESS = 0x36;
const I2C_BUS_NUMBER = 1;
// const TOUCH_BASE = 0x0F;
// const TOUCH_CHANNEL_OFFSET = 0x10;

async function main(){
  const bus = await i2c.openPromisified(I2C_BUS_NUMBER);

  await bus.i2cWrite(SENSOR_I2C_ADDRESS, 2, Buffer.from([ 0x00, 0x02 ]));

  const returnValue = await bus.i2cRead(SENSOR_I2C_ADDRESS, 4, Buffer.alloc(4));

  console.log(returnValue);
}
main();


  

// const i2c_bus = i2c.open(I2C_BUS_NUMBER, err => {
//   if(err){
//     console.log("Error opening i2c bus: ", err);
//     process.exit(1);
//   }

//   console.log("I'm connected?");
//   console.log(i2c_bus)
//   console.log(i2c_bus.i2cFuncsSync());

//   i2c_bus.i2cRead(SENSOR_I2C_ADDRESS, buffLength, buff, (err, buffLength, buff) => {
//     if(err) console.log(err);
//     console.log(buff.toJSON());
  
//   });
// });


// def moisture_read(self):
// """Read the value of the moisture sensor"""
// buf = bytearray(2)

// self.read(_TOUCH_BASE, _TOUCH_CHANNEL_OFFSET, buf, 0.005)
// ret = struct.unpack(">H", buf)[0]
// time.sleep(0.001)

// # retry if reading was bad
// count = 0
// while ret > 4095:
//     self.read(_TOUCH_BASE, _TOUCH_CHANNEL_OFFSET, buf, 0.005)
//     ret = struct.unpack(">H", buf)[0]
//     time.sleep(0.001)
//     count += 1
//     if count > 3:
//         raise RuntimeError("Could not get a valid moisture reading.")

// return ret