export default async function getMetrics(metricID, amount){
    const request = await fetch('http://192.168.0.117:3000/api/metric/' + metricID + '/amount/' + amount, {mode: 'cors'})
    
    const response = await request.json()

    return response
}