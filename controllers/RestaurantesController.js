const {queryAll,queryRun,queryGet} = require("../db/db")
const sql = require("../sql/consultas")


async function Mostrar(req, res) { 
        try { 
            const datos = await queryAll(sql.Mostrar); 
            res.json(datos); 
        } catch (error) { 
            res.status(500).json({ error: error.message }); 
        } 
}
    
async function Insertar(req,res,next) {
        try{
            const {nombre,decoracion,menu,comida,servicio,precio} = req.body;
            await queryRun(sql.Insertar, [nombre,decoracion,menu,comida,servicio,precio]);
            next()
        } catch (error){
            res.status(500).json({error: error.message});
        }

}

async function Promedio(req,res) {
        try {
            const PromedioXRest = await queryAll(sql.Promedio)
            res.json(PromedioXRest)
        } catch (error){
            res.status(500).json({error: error.message})
        }
}

async function PromedioTotal() {
    try {
        const PrTotal = await queryGet(sql.PromedioTotal)
        const PrTotal2 = Math.round(PrTotal["Nota"])
        return PrTotal2
    } catch(error) {
        return 0
    }
}

async function PromedioTotal2(req,res) {
    try {
        const PrTotal = await queryGet(sql.PromedioTotal)
        const PrTotal2 = Math.round(PrTotal["Nota"])
        res.json({"Nota": PrTotal2})
    } catch(error) {
            res.status(500).json({error: error.message})
    }
}

async function NotasMedias1(req,res,next){
    try{
        const fecha = new Date()
        const fechaString = fecha.toLocaleDateString("es-ES"); 

        const Promedio = await PromedioTotal();
        const valor = Promedio?.PromedioTotal || 0
        const Busqueda = await queryGet(sql.CreateNotasMedias1, [fechaString])
            
        if(!Busqueda){
            await queryRun(sql.CreateNotasMedias2, [fechaString,valor])     
        } 
            next()
    } catch (error) {
            res.status(500).json({error: error.message})
    }
}

async function NotasMedias2(req,res){
        try{
            const FechaNota = await queryAll(sql.NotasMedias)
            res.json(FechaNota)
        }  catch (error) {
            res.status(500).json({error: error.message})
        }
        
}

async function RestaurantesInsertados(req,res) {
        try {
            const fecha = new Date()
            const fechaString = fecha.toLocaleDateString("es-ES"); 

            await queryRun(sql.CantidadRestaurantesInsertados, [fechaString,1])
            res.json({"Insertado": "Corectamente"})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

module.exports = {NotasMedias2,NotasMedias1,Insertar,Mostrar,PromedioTotal2,PromedioTotal,Promedio,RestaurantesInsertados}


