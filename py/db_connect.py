import sqlite3
from sqlite3 import Error

def create_connection(db_file):
    connection = None
    try:
        connection = sqlite3.connect(db_file)
        print("db connection success")
    except Error as e:
        print(e)
    return connection

def write_to_db(connection, reading):
    sql = ''' INSERT INTO plants(date, time, temp, moisture) VALUES (?, ?, ?, ?) '''
    cur = connection.cursor()
    cur.execute(sql, reading)
    connection.commit()
    return cur.lastrowid
