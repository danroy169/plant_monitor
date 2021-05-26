import promises from 'node-dht-sensor'
import { DHT_SENSOR_VERSION, DATA_OUT_PIN } from '../../../util/consts.js'

export async function getTempAndHumid() {
  try {
    const res = await promises.read(DHT_SENSOR_VERSION, DATA_OUT_PIN)

    return {
        temp: celToFar(res.temperature), // Math.floor(Math.random() * 100)
        humidity: Math.round(res.humidity) // Math.floor(Math.random() * 100)
    }
  } 
  catch (err) {
    console.error('Failed to read sensor data:', err)
  }
}

function celToFar(cel) {
  return Math.round(cel * 1.8 + 32)
}