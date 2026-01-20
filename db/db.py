import sqlite3
import aiosqlite
from datetime import date
import asyncio

class Relacional:
    def __init__(self, db_path="./db/restaurantes.db"):
        self.db_path = db_path

    def conectar(self):
        return sqlite3.connect(self.db_path)

    def crear_restaurante(self,nombre,decoracion,menu,comida,servicio,precio):
        conn = self.conectar()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO restaurantes(Restaurante,Decoracion,Menu,Comida,Servicio,Precio) VALUES (?,?,?,?,?,?)", (nombre,decoracion,menu,comida,servicio,precio))
        conn.commit()
        conn.close()
    
    def mostrar_restaurantes(self):
        conn = self.conectar()
        cursor = conn.cursor()
        cursor.execute("SELECT Restaurante,Decoracion,Menu,Comida,Servicio,Precio FROM restaurantes")
        todo = cursor.fetchall()
        conn.close()
        return todo
    
    def promedio_restaurante(self):
        conn = self.conectar()
        cursor = conn.cursor()
        cursor.execute("SELECT Restaurante, ROUND((Decoracion+Menu+Comida+Servicio+Precio)/5,1) AS Promedio FROM restaurantes ORDER BY Promedio DESC")
        promedio = cursor.fetchall()
        conn.close()
        return promedio
    
    async def promedio_total(self):
        async with aiosqlite.connect("./db/restaurantes.db") as conn:
            cursor = await conn.execute("SELECT (AVG(Decoracion)+AVG(Menu)+AVG(Comida)+AVG(Servicio)+AVG(Precio))/5 AS promedio_total FROM restaurantes")
            PromedioTotal = await cursor.fetchone()
        
        return round(PromedioTotal[0],2)
    
    async def CreateNotasMediasFecha(self):
        NotaMedia = await self.promedio_total()
        Fecha = date.today()
        FechaString = Fecha.strftime("%Y-%m-%d")

        conn = self.conectar()
        cursor = conn.cursor()
        
        cursor.execute("SELECT NotaMedia FROM NotasMedias WHERE Fecha=? ORDER BY rowid DESC LIMIT 1;",(FechaString,))
        Ultima = cursor.fetchone()


        if Ultima is None or float(NotaMedia) != Ultima[0]:
            conn.execute("INSERT INTO NotasMedias(Fecha,NotaMedia) VALUES (?,?)", (FechaString,NotaMedia))
            conn.commit()
            
        conn.close()
    
    async def ReadNotasMedias(self):
        async with aiosqlite.connect("./db/restaurantes.db") as conn:
            cursor = await conn.execute("SELECT * FROM NotasMedias ORDER BY Fecha ASC")
            FinalNotasMedias = await cursor.fetchall()
            await cursor.close()

        return FinalNotasMedias
    
    def cantidad_resturantes_insertados(self,cantidad,fecha):
        conn = self.conectar()
        cursor = conn.cursor()

        cursor.execute("INSERT INTO RestaurantesAñadidos(Fecha,Cantidad) VALUES (?,?)", (fecha,cantidad))
        conn.commit()
        conn.close()