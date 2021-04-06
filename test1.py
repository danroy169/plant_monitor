import time
import sqlite3
from sqlite3 import Error 
from board import SCL, SDA
import busio
from db_connect import create_connection, write_to_db
from email import send_email
 
from adafruit_seesaw.seesaw import Seesaw
 
i2c_bus = busio.I2C(SCL, SDA)
 
ss = Seesaw(i2c_bus, addr=0x36)

DB = "/home/pi/Projects/Plant Monitor/db/plants.db"
DATE_FORMAT = '%m/%d/%Y'
TIME_FORMAT = '%H:%M:%S'

def cel_to_far(cel):
     return (cel * 1.8) + 32

while True:
    conn = create_connection(DB)
    # read moisture level through capacitive touch pad
    touch = ss.moisture_read()
 
    # read temperature from the temperature sensor
    temp = int(cel_to_far(ss.get_temp()))
    
    date = time.strftime(DATE_FORMAT)
    
    current_time = time.strftime(TIME_FORMAT)
    
    reading = (date, current_time, temp, touch)
    
    reading_id = write_to_db(conn, reading)
    
    print("Last row id: " + str(reading_id))
    
    conn.close()
    
    send_email()

    time.sleep(5)
