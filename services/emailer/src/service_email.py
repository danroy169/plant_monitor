import smtplib
import paho.mqtt.client as mqtt
import json
from send_email import send_email

PORT = 8883
HOST = "localhost"
TOPIC = "email-request"

def on_message(client, userdata, message):
    obj = json.loads(message.payload)
    print(obj)
    # send_email(obj["currentLevel"])

def on_connect(client, userdata, flags, rc):
    print("Emailer connected")

mqttc = mqtt.Client("Emailer")

mqttc.connect(HOST, PORT)

mqttc.subscribe(TOPIC)

mqttc.on_message = on_message

mqttc.on_connect = on_connect

mqttc.loop_forever()




    


