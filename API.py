from flask import Flask,jsonify
from flask import request
from flask_cors import CORS
from db.db import Relacional
from datetime import date


class Api:
    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app)
        self.db = Relacional()
        self.rutas()
    
    def rutas(self):

        @self.app.route('/', methods=['GET'])
        def mostrar_nota_media():
            datos = self.db.promedio_restaurante()
            return jsonify([{"Nombre": nombre, "Nota": nota } for nombre,nota in datos])

        @self.app.route('/mostrar_puntaje', methods=['GET'])
        def mostrar_todo():
            datos = self.db.mostrar_restaurantes()
            return jsonify([{"Nombre": nombre, "Decoracion": decoracion, "Menu": menu, "Cocina": cocina, "Servicio": servicio, "Precio": precio} for nombre,decoracion,menu,cocina,servicio,precio in datos])
    
        @self.app.route('/decoracion', methods=['GET'])
        def decoracion():
            datos = self.db.mostrar_decoracion()
            return jsonify([{"Nombre": nombre, "Decoracion": decoracion, "Menu": menu, "Cocina": cocina, "Servicio": servicio, "Precio": precio} for nombre,decoracion,menu,cocina,servicio,precio in datos])
    
        @self.app.route('/menu', methods=['GET'])
        def menu():
            datos = self.db.mostrar_menu()
            return jsonify([{"Nombre": nombre, "Decoracion": decoracion, "Menu": menu, "Cocina": cocina, "Servicio": servicio, "Precio": precio} for nombre,decoracion,menu,cocina,servicio,precio in datos])
    
        @self.app.route('/servicio', methods=['GET'])
        def servicio():
            datos = self.db.mostrar_servicio()
            return jsonify([{"Nombre": nombre, "Decoracion": decoracion, "Menu": menu, "Cocina": cocina, "Servicio": servicio, "Precio": precio} for nombre,decoracion,menu,cocina,servicio,precio in datos])
    
        @self.app.route('/precio', methods=['GET'])
        def precio():
            datos = self.db.mostrar_precio()
            return jsonify([{"Nombre": nombre, "Decoracion": decoracion, "Menu": menu, "Cocina": cocina, "Servicio": servicio, "Precio": precio} for nombre,decoracion,menu,cocina,servicio,precio in datos])
    
        @self.app.route('/insertar_restaurante', methods=['POST'])
        def insertar_restaurante():
            try:
                Hoy = date.today()
                HoyStr = Hoy.strftime("%Y-%m-%d")
                nombre = request.form.get("nombre")
                decoracion = float(request.form.get("decoracion"))
                menu = float(request.form.get("menu"))
                comida = float(request.form.get("comida"))
                servicio = float(request.form.get("servicio"))
                precio = float(request.form.get("precio"))
                self.db.crear_restaurante(nombre,decoracion,menu,comida,servicio,precio)
                self.db.cantidad_resturantes_insertados(1,HoyStr)
                return jsonify ({"Nombre": nombre,
                         "Decoracion": decoracion,
                         "Menu": menu,
                         "Comida": comida,
                         "Servicio": servicio,
                         "Precio": precio
                         })
            except Exception as e:
                return jsonify({"status": "error", "message": str(e)}), 400
       
    
        @self.app.route('/nota_fecha', methods=['GET'])
        def promedio_con_fecha():
            FechaNota = self.db.select_and_create_notas_medias()
            return jsonify([{"Fecha": Fecha, "Nota": Nota} for Fecha,Nota in FechaNota])

    
        @self.app.route('/nota', methods=['GET'])
        def promedio():
            promedio = self.db.promedio_total()
            return jsonify({"Nota": promedio})
        
    def encender(self):
        self.app.run(port=3000)


api = Api()
api.encender()