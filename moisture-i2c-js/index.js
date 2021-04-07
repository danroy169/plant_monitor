const i2c = require('i2c-bus');
const sleep = require('sleep');

const SENSOR_I2C_ADDRESS = 0x36;
const I2C_BUS_NUMBER = 1;

const i2c_bus = i2c.open(I2C_BUS_NUMBER, function(err) {
  if(err){
    console.log("Error opening i2c bus: ", err);
    process.exit(1);
  }
  console.log("I'm connected?");
}
);




