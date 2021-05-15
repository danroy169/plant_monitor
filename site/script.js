

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

async function displayMoisture1Average(){
    const response = await getMetrics('moisture1', 'average')

    const average = Math.round(response.result[0])

    const div = document.getElementById('moisture1Div')
    
    const p = document.createElement('p')

    p.innerText = average

    div.appendChild(p)
}

async function displayMoisture2Average(){
    const response = await getMetrics('moisture2', 'average')

    const average = Math.round(response.result[0])

    const div = document.getElementById('moisture2Div')
    
    const p = document.createElement('p')

    p.innerText = average

    div.appendChild(p)
}

async function displayTempAverage(){
    const response = await getMetrics('temp', 'average')

    const average = Math.round(response.result[0])

    const div = document.getElementById('tempDiv')
    
    const p = document.createElement('p')

    p.innerText = average

    div.appendChild(p)
}

async function displayHumidAverage(){
    const response = await getMetrics('humidity', 'average')

    const average = Math.round(response.result[0])

    const div = document.getElementById('humidDiv')
    
    const p = document.createElement('p')

    p.innerText = average

    div.appendChild(p)
}



async function init() { 

    await setupSSE() 

    const moisture1Button = document.getElementById('getAverageMoisture1')
    moisture1Button.addEventListener('click', displayMoisture1Average)

    const moisture2Button = document.getElementById('getAverageMoisture2')
    moisture2Button.addEventListener('click', displayMoisture2Average)

    const tempButton = document.getElementById('getAverageTemp')
    tempButton.addEventListener('click', displayTempAverage)

    const humidButton = document.getElementById('getAverageHumid')
    humidButton.addEventListener('click', displayHumidAverage)
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

