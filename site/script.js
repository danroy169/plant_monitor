const moistureReading = document.getElementById("moisture")
const tempReading = document.getElementById("temp")
const humidReading = document.getElementById("humid")

async function getReadings() {
    
    const response = await fetch('http://localhost:3000/api/latest-readings', {mode: 'cors'})

    const readings = await response.json()

    moistureReading.innerText = readings.moisture1.result[0].moistureLevel

    tempReading.innerText = readings.temp.result[0].fahrenheit

    humidReading.innerText = readings.humidity.result[0].percent

    console.log(readings)
}

async function init(){
    await getReadings()
}

init()