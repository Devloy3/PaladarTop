import aiosqlite
from datetime import date
from dotenv import load_dotenv
import os

load_dotenv()

class Relacional:
    def __init__(self):
        self.db_path = os.getenv("DB_PATH")
        

    async def CrearRestaurante(self,nombre,decoracion,menu,comida,servicio,precio):
       async with aiosqlite.connect(self.db_path) as conn:
            await conn.execute("INSERT INTO restaurantes(Restaurante,Decoracion,Menu,Comida,Servicio,Precio) VALUES (?,?,?,?,?,?)", (nombre,decoracion,menu,comida,servicio,precio)) 
            await conn.commit() 
    
    async def mostrar_restaurantes(self):
       async with aiosqlite.connect(self.db_path) as conn:
            async with conn.execute("SELECT Restaurante,Decoracion,Menu,Comida,Servicio,Precio FROM restaurantes") as cursor:
                todo = await cursor.fetchall()
                return todo
    
    async def promedio_restaurante(self):
        async with aiosqlite.connect(self.db_path) as conn:
            async with conn.execute("SELECT Restaurante, ROUND((Decoracion+Menu+Comida+Servicio+Precio)/5,1) AS Promedio FROM restaurantes ORDER BY Promedio DESC") as cursor:
                promedio = await cursor.fetchall()
                return promedio
    
    async def promedio_total(self):
        async with aiosqlite.connect(self.db_path) as conn:
            async with conn.execute("SELECT (AVG(Decoracion)+AVG(Menu)+AVG(Comida)+AVG(Servicio)+AVG(Precio))/5 AS promedio_total FROM restaurantes") as cursor:
                try:
                    PromedioTotal = await cursor.fetchone()
                    return round(PromedioTotal[0],2)
                except:
                    return 0

    async def CreateNotasMediasFecha(self):
        NotaMedia = await self.promedio_total()
        Fecha = date.today()
        FechaString = Fecha.strftime("%Y-%m-%d")

      
        async with aiosqlite.connect(self.db_path) as conn:
            async with conn.execute("SELECT NotaMedia FROM NotasMedias WHERE Fecha=? ORDER BY rowid DESC LIMIT 1;",(FechaString,)) as cursor:
                Ultima = await cursor.fetchone()


            if Ultima is None or float(NotaMedia) != Ultima[0]:
                await conn.execute("INSERT INTO NotasMedias(Fecha,NotaMedia) VALUES (?,?)", (FechaString,NotaMedia))
                await conn.commit()
    
    async def ReadNotasMedias(self):
        async with aiosqlite.connect(self.db_path) as conn:
            async with conn.execute("SELECT * FROM NotasMedias ORDER BY Fecha ASC") as cursor:
                FinalNotasMedias = await cursor.fetchall()
                return FinalNotasMedias
    
    async def cantidad_resturantes_insertados(self,cantidad,fecha):
        async with aiosqlite.connect(self.db_path) as conn:
            await conn.execute("INSERT INTO RestaurantesAñadidos(Fecha,Cantidad) VALUES (?,?)", (fecha,cantidad)) 
            await conn.commit()