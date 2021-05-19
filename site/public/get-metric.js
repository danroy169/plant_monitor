export async function getMetrics(metricID, amount){
    // const request = await fetch('http://192.168.0.117:3000/api/metric/' + metricID + '/amount/' + amount, {mode: 'cors'})
    const request = await fetch('http://localhost:3000/api/metric/' + metricID + '/amount/' + amount, {mode: 'cors'})
    
    const response = await request.json()

    return response
}

export async function getAverage(metricID) {
    const response = await getMetrics(metricID, 'average')

    const average = Math.round(response[0])

    return average
}