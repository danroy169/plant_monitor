import time
import sqlite3
from sqlite3 import Error
from board import SCL, SDA
import busio
from db_connect import create_connection, write_to_db
from emailer import send_email
from adafruit_seesaw.seesaw import Seesaw

I2C_BUS = busio.I2C(SCL, SDA)

SS = Seesaw(I2C_BUS, addr=0x36)

DB = "/home/pi/Projects/Plant Monitor/db/plants.db"
DATE_FORMAT = '%m/%d/%Y'
TIME_FORMAT = '%H:%M:%S'


def cel_to_far(cel):
    return (cel * 1.8) + 32


while True:
    conn = create_connection(DB)

    moisture = SS.moisture_read()

    temp = int(cel_to_far(SS.get_temp()))

    date = time.strftime(DATE_FORMAT)

    current_time = time.strftime(TIME_FORMAT)

    reading = (date, current_time, temp, moisture)

    reading_id = write_to_db(conn, reading)

    print("Last row id: " + str(reading_id))

    conn.close()

    if(moisture < 300):
        send_email(moisture)

    time.sleep(5)
