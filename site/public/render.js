import getMetrics from './get-metric.js'
import setupSSE from './sse-setup.js'

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



export { init }