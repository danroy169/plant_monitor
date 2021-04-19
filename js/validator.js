import {Validator} from "jsonschema";
import {schemas} from "/home/pi/Projects/Plant Monitor/js/all-schemas.js";



export default function validateJSON(obj){
    const v = new Validator();
    let result = false;
    schemas.forEach(s => {
        if(v.validate(obj, s).valid) {result = true};
    })
    return result;
}

const test = [{
    "sensorID": "moisture1",
    "time": "2012-01-26T13:51:50.417-07:00",
    "type": "moisture",
    "moistureLevel": 330,
    "currentPollInterval": 5

},
{
    "sensorID": "temp-humid",
    "type": "temp",
    "time": "2012-01-26T13:51:50.417-07:00",
},
{
    "target": "moisture1",
    "setting": "pollInterval",
    "data": 30,
    "time": "2012-01-26T13:51:50.417-07:00"
},
{
    "target": "moisture1",
    "result": true,
    "time": "2012-01-26T13:51:50.417-07:00"
},
{
    "sensorID": "moisture2",
    "violationType": "moisture",
    "threshold": 330,
    "currentLevel": 300,
    "time": "2012-01-26T13:51:50.417-07:00"
},
{
    "sensorID": "temp-humid",
    "violationType": "humidity",
    "threshold": 75,
    "reading": 80,
    "time": "2012-01-26T13:51:50.417-07:00"
},
{
    "result": true,
    "time": "2012-01-26T13:51:50.417-07:00"
},
{
    "metric": "moisture1",
    "numberOfReadings": 10,
    "time": "2012-01-26T13:51:50.417-07:00"
},
{
    "metric": "moisture1",
    "result":[ { "moistureLevel": 330, "time": "2012-01-26T13:51:50.417-07:00" } ],
    "time": "2012-01-26T13:51:50.417-07:00"
}
]


// test.forEach(t => {
//     console.log(validateJSON(t))
// })

//console.log(validateJSON({"this": "is not valid"}))