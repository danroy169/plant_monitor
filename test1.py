import time
import sqlite3
from sqlite3 import Error 
from board import SCL, SDA
import busio
 
from adafruit_seesaw.seesaw import Seesaw
 
i2c_bus = busio.I2C(SCL, SDA)
 
ss = Seesaw(i2c_bus, addr=0x36)

def cel_to_far(cel):
     return (cel * 1.8) + 32

def create_connection(db_file):
    connection = None
    try:
        connection = sqlite3.connect(db_file)
        print(sqlite3.version)
    except Error as e:
        print(e)
    return connection

def write_to_db(connection, reading):
    sql = ''' INSERT INTO plants(date, time, temp, moisture) VALUES (?, ?, ?, ?) '''
    cur = connection.cursor()
    cur.execute(sql, reading)
    conn.commit()
    return cur.lastrowid
    

while True:
    conn = create_connection("/home/pi/Projects/Plant Monitor/db/plants.db")
    # read moisture level through capacitive touch pad
    touch = ss.moisture_read()
 
    # read temperature from the temperature sensor
    temp = int(cel_to_far(ss.get_temp()))
    
    date = time.strftime('%m/%d/%Y')
    
    current_time = time.strftime('%H:%M:%S')
    
    reading = (date, current_time, temp, touch)
    
    reading_id = write_to_db(conn, reading)
    
    print(reading_id)
    
    conn.close()

    time.sleep(5)
