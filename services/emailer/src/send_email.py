import smtplib

PORT = 465  # For SSL
SMTP_SERVER_NAME = "smtp.gmail.com"
PASSWORD = "thisisapassword"
SEND_EMAIL = "royplantmonitor@gmail.com"
RECIEVE_EMAIL = "danielwroy90@gmail.com"
MOISTURE = "moisture"
TEMP = "temp"
HUMIDITY = "humidity"


def send_email(sensor_id, violation_type, currentLevel):
    message = """\
        Subject: Plant Alert

        This message is sent from the Raspberry Pi Plant Monitor."""

    if(violation_type == MOISTURE): 
        message += "\nSoil moisture latest reading from sensor """ + sensor_id + " is "  + str(currentLevel) + " please water ASAP"
    
    if(violation_type == TEMP): 
        message += "\nTemp latest reading from sensor """ + sensor_id + " is "  + str(currentLevel)
    
    if(violation_type == HUMIDITY):
        message += "\nHumidity latest reading from sensor """ + sensor_id + " is "  + str(currentLevel)

    connection = smtplib.SMTP_SSL(SMTP_SERVER_NAME, PORT)
    connection.login(SEND_EMAIL, PASSWORD)
    connection.sendmail(SEND_EMAIL, RECIEVE_EMAIL, message)
    connection.close()
