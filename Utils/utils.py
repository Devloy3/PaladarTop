import sqlite3 

conn = sqlite3.connect("../db/restaurantes.db")
cursor = conn.cursor()

sql = ('''
               CREATE TABLE IF NOT EXISTS Restaurantes(
               id PRIMARY KEY AUTOINCREMENT,
               Restaurante VARCHAR(100),
               Decoracion DECIMAL(2,2),
               Menu DECIMAL(2,2),
               Comida DECIMAL(2,2),
               Servicio DECIMAL(2,2),
               Precio DECIMAL(2,2)
               ); 
                
                CREATE TABLE IF NOT EXISTS NotasMedias(
                Fecha DATE,
                NotaMedia DECIMAL(2,2));
       
                CREATE TABLE RestaurantesAñadidos (
                Fecha TEXT,
                Cantidad INT)'''
               )

cursor.executescript(sql)
