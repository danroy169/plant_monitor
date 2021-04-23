import smtplib

PORT = 465  # For SSL
SMTP_SERVER_NAME = "smtp.gmail.com"
PASSWORD = "thisisapassword"
SEND_EMAIL = "royplantmonitor@gmail.com"
RECIEVE_EMAIL = "danielwroy90@gmail.com"


def send_email(moisture):

    message = """\
        Subject: Plant Alert

        This message is sent from the Raspberry Pi Plant Monitor.
        \nSoil moisture latest reading is """ + str(moisture) + " please water ASAP"

    connection = smtplib.SMTP_SSL(SMTP_SERVER_NAME, PORT)
    connection.login(SEND_EMAIL, PASSWORD)
    connection.sendmail(SEND_EMAIL, RECIEVE_EMAIL, message)
    connection.close()