import promises from 'node-dht-sensor'

const DHT_SENSOR_VERSION = 22
const DATA_OUT_PIN = 4

export async function getTempAndHumid() {
  try {
    const res = await promises.read(DHT_SENSOR_VERSION, DATA_OUT_PIN)

    return {
        temp: celToFar(res.temperature),
        humidity: Math.round(res.humidity)
    }

  } catch (err) {
    console.error('Failed to read sensor data:', err)
  }
}

function celToFar(cel) {
  return Math.round(cel * 1.8 + 32)
}