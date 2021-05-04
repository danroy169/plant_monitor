console.log('start')

async function getReadings() {
    const response = await fetch('http://localhost:3000/api/latest-readings', { mode: 'cors' })

    const readings = await response.json()

    console.log(readings)

    return readings
}

async function init() {
    const moistureReading = document.getElementById("moisture")
    const tempReading = document.getElementById("temp")
    const humidReading = document.getElementById("humid")

    const moistureTime = document.getElementById('moistureTime')
    const tempTime = document.getElementById('tempTime')
    const humidTime = document.getElementById('humidTime')

    const readings = await getReadings()

    moistureReading.innerText = readings.moisture1.result[0].moistureLevel

    tempReading.innerText = readings.temp.result[0].fahrenheit

    humidReading.innerText = readings.humidity.result[0].percent

    moistureTime.innerText = new Date(readings.moisture1.result[0].time).toLocaleTimeString()

    tempTime.innerText = new Date(readings.temp.result[0].time).toLocaleTimeString()

    humidTime.innerText = new Date(readings.humidity.result[0].time).toLocaleTimeString()
}

if(document.readyState === 'loading') { 
    console.log('loading')
    window.addEventListener('DOMContentLoaded', event => init())
}
else { 
    init()
}
