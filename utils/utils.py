import sqlite3 

conn = sqlite3.connect("../db/restaurantes.db")
cursor = conn.cursor()

cursor.execute('''
               CREATE TABLE IF NOT EXISTS Restaurantes(
               id PRIMARY KEY AUTOINCREMENT,
               Restaurante VARCHAR(100),
               Decoracion DECIMAL(2,2),
               Menu DECIMAL(2,2),
               Comida DECIMAL(2,2),
               Servicio DECIMAL(2,2),
               Precio DECIMAL(2,2)
               ); '''
               )
