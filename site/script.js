
async function getReadings() {
    const response = await fetch('http://localhost:3000/api/latest-readings', {mode: 'cors'})

    const readings = await response.json()

    console.log(readings)
}

getReadings()