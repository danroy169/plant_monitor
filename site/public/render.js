import { getAverage, getMetrics } from './get-metric.js'
import setupSSE from './sse-setup.js'

export async function init() { 

    await setupSSE() 

    populateAverages()
    // populateMinMaxTable()

    // document.getElementById('averageRefresh').addEventListener('click', populateAverages)
    // document.getElementById('minMaxRefresh').addEventListener('click', populateMinMaxTable)

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


export async function populateMinMaxTable(){
    const moisture1 = await getMetrics('moisture1', 'minMax')
    const moisture2 = await getMetrics('moisture2', 'minMax')
    const temp = await getMetrics('temp', 'minMax')
    const humidity = await getMetrics('humidity', 'minMax')

    document.getElementById('moist1Min').innerText = moisture1[0].min
    document.getElementById('moist1Max').innerText = moisture1[0].max
    document.getElementById('moist2Min').innerText = moisture2[0].min
    document.getElementById('moist2Max').innerText = moisture2[0].max
    document.getElementById('tempMin').innerText = temp[0].min
    document.getElementById('tempMax').innerText = temp[0].max
    document.getElementById('humidMin').innerText = humidity[0].min
    document.getElementById('humidMax').innerText = humidity[0].max
}

