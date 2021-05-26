export default async function setupSSE() {
    const evtSource = new EventSource('http://192.168.0.117:3030/sse');
    //const evtSource = new EventSource('http://localhost:3030/sse');

    const elements = {
        moisture1Reading: document.getElementById('moisture1'),
        moisture2Reading: document.getElementById('moisture2'),
        tempReading: document.getElementById('temp'),
        humidReading: document.getElementById('humid'),
    }

    evtSource.onmessage = event => { onMessage(event, elements) }
}


function onMessage(event, elements){
    const message = JSON.parse(event.data)

    if(message.fahrenheit) { 
        elements.tempReading.innerHTML = message.fahrenheit + "&#8457;"
    }

    if(message.percent) { 
        elements.humidReading.innerText = message.percent + "%"
    }

    if(message.sensorID === 'moisture1') { 
        elements.moisture1Reading.innerText = message.moistureLevel
    }

    if(message.sensorID === 'moisture2') { 
        elements.moisture2Reading.innerText = message.moistureLevel
    }
}