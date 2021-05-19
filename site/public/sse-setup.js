export default async function setupSSE() {
    // const evtSource = new EventSource('http://192.168.0.117:3030/sse');
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


function onMessage(event, elements){
    const message = JSON.parse(event.data)

    if(message.fahrenheit) { 
        elements.tempReading.innerText = message.fahrenheit
        elements.tempTime.innerText = message.time
    }

    if(message.percent) { 
        elements.humidReading.innerText = message.percent
        elements.humidTime.innerText = message.time
    }

    if(message.sensorID === 'moisture1') { 
        elements.moisture1Reading.innerText = message.moistureLevel
        elements.moisture1Time.innerText = message.time
    }

    if(message.sensorID === 'moisture2') { 
        elements.moisture2Reading.innerText = message.moistureLevel
        elements.moisture2Time.innerText = message.time
    }
}