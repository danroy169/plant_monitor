const i2c = require('i2c-bus');
const sleep = require('sleep');

const SENSOR_I2C_ADDRESS = 0x36;
const I2C_BUS_NUMBER = 1;
const TOUCH_BASE = 0x0F;
const TOUCH_CHANNEL_OFFSET = 0x10;


let buff = Buffer.alloc(2);
const buffLength = buff.length;


const i2c_bus = i2c.open(I2C_BUS_NUMBER, function(err) {
  if(err){
    console.log("Error opening i2c bus: ", err);
    process.exit(1);
  }
  console.log("I'm connected?");
  i2c_bus.i2cRead(SENSOR_I2C_ADDRESS, 2, buff, function(err, buffLength, buff) {
    console.log(buff.toJSON());
  });
 
}
);


// const read = (self, reg_base, reg, buf, delay = 0.008) => {
//   // read an arbirary i2c register range on the device
//   self.write(reg_base, reg)
// }




