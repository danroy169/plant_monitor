//import promises from 'node-dht-sensor'
import { DHT_SENSOR_VERSION, DATA_OUT_PIN } from '../../../util/consts.js'

export async function getTempAndHumid() {
  try {
    //const res = await promises.read(DHT_SENSOR_VERSION, DATA_OUT_PIN)

    return {
        temp: Math.floor(Math.random() * 100), //celToFar(res.temperature),
        humidity: Math.floor(Math.random() * 100), //Math.round(res.humidity)
    }
  } 
  catch (err) {
    console.error('Failed to read sensor data:', err)
  }
}

function celToFar(cel) {
  return Math.round(cel * 1.8 + 32)
}