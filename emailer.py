import smtplib

port = 465  # For SSL
smtp_server_name = "smtp.gmail.com"
password = "thisisapassword"
this_email = "royplantmonitor@gmail.com"
email_to = "danielwroy90@gmail.com"


def send_email(moisture):
    
    message = """\
        Subject: Plant Alert

        This message is sent from the Raspberry Pi Plant Monitor.
        \nSoil moisture latest reading is """ + str(moisture)
    
    if(moisture < 400):
        message += ". That is too low. Please water"


    connection = smtplib.SMTP_SSL(smtp_server_name, port)
    connection.login(this_email, password)
    connection.sendmail(this_email, email_to, message)
    connection.close()

    





