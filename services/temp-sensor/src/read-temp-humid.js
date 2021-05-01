import promises from 'node-dht-sensor'

export async function getTempAndHumid() {
  try {
    const res = await promises.read(22, 4)
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