import promises from 'node-dht-sensor'
import { DHT_SENSOR_VERSION, DATA_OUT_PIN } from '../../../util/consts.js'

export async function getTempAndHumid(home) {
  try {
    if(home) { 
      const res = await promises.read(DHT_SENSOR_VERSION, DATA_OUT_PIN) 

      return {
        temp: celToFar(res.temperature),
        humidity: Math.round(res.humidity)
      }
    }
    else {

      return {
        temp: Math.floor(Math.random() * 100),
        humidity: Math.floor(Math.random() * 100)
      }
    }
  } 
  catch (err) {
    console.error('Failed to read sensor data:', err)
  }
}

function celToFar(cel) {
  return Math.round(cel * 1.8 + 32)
}