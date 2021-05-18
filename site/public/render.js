import { getAverage } from './get-metric.js'
import setupSSE from './sse-setup.js'

async function init() { 

    await setupSSE() 

    displayMoisture1Average()
    displayMoisture2Average()
    displayHumidAverage()
    displayTempAverage()

}

async function displayMoisture1Average(){

    const average = await getAverage('moisture1')

    document.getElementById('moisture1Avg').innerText = average
}

async function displayMoisture2Average(){

    const average = await getAverage('moisture2')

    document.getElementById('moisture2Avg').innerText = average
    
}

async function displayTempAverage(){

    const average = await getAverage('temp')

    document.getElementById('tempAvg').innerText = average
}

async function displayHumidAverage(){

    const average = await getAverage('humidity')

    document.getElementById('humidAvg').innerText = average
}



export { init }