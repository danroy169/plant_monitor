const MQTT = require("async-mqtt");

const client = MQTT.connect("mqtt:localhost:1883");

const doStuff = async () => {
	console.log("Connecting");
	try {
		await client.subscribe("wow/so/cool")

	} catch (e){

		console.log(e.stack);

		process.exit();
	}
}

client.on("connect", doStuff);
client.on("message", function(topic, message){
    const json = JSON.parse(message.toString())
	console.log(json);
	client.end();
});

