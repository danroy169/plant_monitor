import { getAverage, getMetrics } from './get-metric.js'
import setupSSE from './sse-setup.js'

export async function init() { 

    await setupSSE() 

    populateAverages()
}
export async function  populateAverages(){
    const moisture1Average = await getAverage('moisture1')
    const moisture2Average = await getAverage('moisture2')
    const tempAverage = await getAverage('temp')
    const humidAverage = await getAverage('humidity')

    document.getElementById('humidAvg').innerText = humidAverage + "%"
    document.getElementById('tempAvg').innerHTML= tempAverage + "&#8457;"
    document.getElementById('moisture2Avg').innerText = moisture2Average
    document.getElementById('moisture1Avg').innerText = moisture1Average
}


