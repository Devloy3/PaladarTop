from fastapi import FastAPI,Form
from fastapi.middleware.cors import CORSMiddleware
from db.db import Relacional
from datetime import date


class Api:
    def __init__(self):
        self.app = FastAPI()
        self.db = Relacional()
        self.rutas()
        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=["http://localhost:5500"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
    
    def rutas(self):
        
        @self.app.get('/')
        async def mostrar_nota_media():
            datos = await self.db.promedio_restaurante()
            NotaMedia = [{"Nombre": nombre, "Nota": nota } for nombre,nota in datos]
            return NotaMedia

        @self.app.get('/mostrar_puntaje')
        async def mostrar_todo():
            datos = await self.db.mostrar_restaurantes()
            Puntaje = [{"Nombre": nombre, "Decoracion": decoracion, "Menu": menu, "Cocina": cocina, "Servicio": servicio, "Precio": precio} for nombre,decoracion,menu,cocina,servicio,precio in datos]
            return Puntaje
    
        @self.app.post('/insertar_restaurante')
        async def insertar_restaurante(  
            nombre: str = Form(...),
            decoracion: float = Form(...),
            menu: float = Form(...),
            comida: float = Form(...),
            servicio: float = Form(...),
            precio: float = Form(...)):
            try:
                Hoy = date.today()
                HoyStr = Hoy.strftime("%Y-%m-%d")
                await self.db.CrearRestaurante(nombre,decoracion,menu,comida,servicio,precio)
                await self.db.cantidad_resturantes_insertados(1,HoyStr)
                return ({"Nombre": nombre,
                         "Decoracion": decoracion,
                         "Menu": menu,
                         "Comida": comida,
                         "Servicio": servicio,
                         "Precio": precio
                         })
            except Exception as e:
                return {"status": "error", "message": str(e)}
       
    
        @self.app.get('/nota_fecha')
        async def promedio_con_fecha():
            await self.db.CreateNotasMediasFecha()
            FechaNota = await self.db.ReadNotasMedias()
            return [{"Fecha": Fecha, "Nota": Nota} for Fecha,Nota in FechaNota]
        
    
        @self.app.get('/nota')
        async def promedio():
            Promedio = await self.db.promedio_total()
            return ({"Nota": Promedio})



api = Api()
app = api.app