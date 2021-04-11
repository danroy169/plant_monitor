import smtplib
import paho.mqtt.client as mqtt
import json
from send_email import send_email

PORT = 8883
HOST = "localhost"
TOPIC = "moisture"

def on_message(client, userdata, message):
    obj = json.loads(message.payload)
    print(obj)
    moisture = obj["moisture"]
    if (moisture < 300):
        send_email(moisture)

mqttc = mqtt.Client()

mqttc.on_message = on_message
mqttc.connect(HOST, PORT)
mqttc.subscribe(TOPIC)

mqttc.loop_forever()


