import smtplib

port = 465  # For SSL
smtp_server_name = "smtp.gmail.com"
password = "Letsgo420"
this_email = "royplantmonitor@gmail.com"
email_to = "danielwroy90@gmail.com"
message = """\
Subject: Hi there

This message is sent from Python."""

def send_email():
    connection = smtplib.SMTP_SSL(smtp_server_name, port)
    connection.login(this_email, password)
    connection.sendmail(this_email, email_to, message)
    connection.close()

    





