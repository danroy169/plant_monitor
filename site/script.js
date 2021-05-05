async function setupSSE() {
    const evtSource = new EventSource("http://localhost:3030/sse");

    const elements = {
        moistureReading: document.getElementById("moisture"),
        moistureTime: document.getElementById('moistureTime'),
        tempReading: document.getElementById('temp'),
        tempTime: document.getElementById('tempTime'),
        humidReading: document.getElementById('humid'),
        humidTime: document.getElementById('humidTime')
    }

    evtSource.onmessage = event => { onMessage(event, elements) }
}

async function init() { await setupSSE() }

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
        humidTime.innerText = new Date(message.time).toLocaleTimeString() 
    }

    if(message.moistureLevel) { 
        elements.moistureReading.innerText = message.moistureLevel
        elements.moistureTime.innerText = new Date(message.time).toLocaleTimeString() 
    }

}