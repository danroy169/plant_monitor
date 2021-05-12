

async function setupSSE() {
    const evtSource = new EventSource('http://localhost:3030/sse');

    const elements = {
        moisture1Reading: document.getElementById('moisture1'),
        moisture1Time: document.getElementById('moisture1Time'),
        moisture2Reading: document.getElementById('moisture2'),
        moisture2Time: document.getElementById('moisture2Time'),
        tempReading: document.getElementById('temp'),
        tempTime: document.getElementById('tempTime'),
        humidReading: document.getElementById('humid'),
        humidTime: document.getElementById('humidTime')
    }

    evtSource.onmessage = event => { onMessage(event, elements) }
}
async function getMetrics(metricID, amount){
    const request = await fetch('http://localhost:3000/api/metric/' + metricID + '/amount/' + amount, {mode: 'cors'})
    
    const response = await request.json()

    return response
}

async function displayMoisture1(){
    const readings = await getMetrics('moisture1', 'all')

    const div = document.getElementById('moistureDiv')

    const list = document.createElement('ul')

    div.appendChild(list)

    readings.result.forEach(obj => {
        let li = document.createElement('li')
        li.innerText = obj.moistureLevel
        list.appendChild(li)
    })
}


async function init() { 
    await setupSSE() 
    const button = document.getElementById('getAllMoistureReadings')
    button.addEventListener('click', displayMoisture1)
}

if(document.readyState === 'loading') { 
    console.log('loading')
    window.addEventListener('DOMContentLoaded', event => init())
}
else { 
    init()
}

function onMessage(event, elements){
    const message = JSON.parse(event.data)

    if(message.fahrenheit) { 
        elements.tempReading.innerText = message.fahrenheit
        elements.tempTime.innerText = new Date(message.time).toLocaleTimeString()
    }

    if(message.percent) { 
        elements.humidReading.innerText = message.percent
        elements.humidTime.innerText = new Date(message.time).toLocaleTimeString()
    }

    if(message.sensorID === 'moisture1') { 
        elements.moisture1Reading.innerText = message.moistureLevel
        elements.moisture1Time.innerText = new Date(message.time).toLocaleTimeString()
    }

    if(message.sensorID === 'moisture2') { 
        elements.moisture2Reading.innerText = message.moistureLevel
        elements.moisture2Time.innerText = new Date(message.time).toLocaleTimeString()
    }
}

