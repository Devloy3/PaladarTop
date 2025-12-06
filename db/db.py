import sqlite3
from datetime import date

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
    
    def mostrar_decoracion(self):
        conn = self.conectar()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM restaurantes ORDER BY Decoracion")
        decoracion = cursor.fetchall()
        conn.close()
        return decoracion
    
    def mostrar_menu(self):
        conn = self.conectar()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM restaurantes ORDER BY Menu")
        menu = cursor.fetchall()
        conn.close()
        return menu
    
    def mostrar_comida(self):
        conn = self.conectar()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM restaurantes ORDER BY Comida")
        comida = cursor.fetchall()
        conn.close()
        return comida
    
    def mostrar_servicio(self):
        conn = self.conectar()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM restaurantes ORDER BY Servicio")
        servicio = cursor.fetchall()
        conn.close()
        return servicio
    
    def mostrar_precio(self):
        conn = self.conectar()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM restaurantes ORDER BY Precio")
        precio = cursor.fetchall()
        conn.close()
        return precio
    
    def promedio_restaurante(self):
        conn = self.conectar()
        cursor = conn.cursor()
        cursor.execute("SELECT Restaurante, ROUND((Decoracion+Menu+Comida+Servicio+Precio)/5,1) AS Promedio FROM restaurantes ORDER BY Promedio DESC")
        promedio = cursor.fetchall()
        conn.close()
        return promedio
    
    def promedio_total(self):
        conn = self.conectar()
        cursor = conn.cursor()
        cursor.execute("SELECT (AVG(Decoracion)+AVG(Menu)+AVG(Comida)+AVG(Servicio)+AVG(Precio))/5 AS promedio_total FROM restaurantes")
        total = cursor.fetchone()
        final = round(total[0],2)
        conn.close()
        return final
    
    def select_and_create_notas_medias(self):
        NotaMedia = self.promedio_total()
        Fecha = date.today()
        FechaString = Fecha.strftime("%Y-%m-%d")

        conn = self.conectar()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM NotasMedias ORDER BY Fecha DESC LIMIT 1;")
        Ultima = cursor.fetchone()

        if Ultima is None or FechaString != Ultima[0] or NotaMedia != Ultima[1]:
            cursor.execute("INSERT INTO NotasMedias(Fecha,NotaMedia) VALUES (?,?)", (FechaString,NotaMedia))

        cursor.execute("SELECT * FROM NotasMedias ORDER BY Fecha DESC")
        FinalNotasMedias = cursor.fetchall
        
        conn.commit()
        conn.close()

        return FinalNotasMedias