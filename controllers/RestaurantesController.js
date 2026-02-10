const {queryAll,queryRun,queryGet} = require("../db/db")
const sql = require("../sql/consultas")

const fecha = new Date()
const fechaString = fecha.toLocaleDateString("es-ES"); 


module.exports = {
   async Mostrar(req, res) { 
        try { 
            const datos = await queryAll(sql.Mostrar); 
            res.json(datos); 
        } catch (error) { 
            res.status(500).json({ error: error.message }); 
        } 
    },
    
    async Insertar(req,res,next) {
        try{
            const {nombre,decoracion,menu,comida,servicio,precio} = req.body;
            await queryRun(sql.Insertar, [nombre,decoracion,menu,comida,servicio,precio]);
            next()
        } catch (error){
            res.status(500).json({error: message.error});
        }

    },

    async Promedio(req,res) {
        try {
            const PromedioXRest = await queryAll(sql.Promedio)
            res.json(PromedioXRest)
        } catch (error){
            res.status(500).json({error: message.error})
        }
    },

    async PromedioTotal(req,res) {
        try {
            const PrTotal = await queryGet(sql.PromedioTotal)
            res.json(PrTotal)
        } catch(error) {
            res.status(500).json({error: message.error})
        }
    },

    async NotasMedias1(req,res,next){
        try{
            const Promedio = await this.PromedioTotal()
            const Busqueda = await queryGet(sql.CreateNotasMedias1, [fechaString])
            
            if(!Busqueda || Busqueda.Fecha != fechaString){
                await queryRun(sql.CreateNotasMedias2, [fechaString,Promedio])     
                next() 
            } 
        
        } catch (error) {
            res.status(500).json({error: message.error})
        }
    },

    async NotasMedias2(req,res){
        try{
            const FechaNota = await queryAll(sql.NotasMedias)
            res.json(FechaNota)
        }  catch (error) {
            res.status(500).json({error: message.error})
        }
        
    },

    async RestaurantesInsertados(req,res) {
        try {
            await queryRun(sql.CantidadRestaurantesInsertados, [fechaString,1])
            res.json({"Insertado": "Corectamente"})
        } catch (error) {
            res.status(500).json({error: message.error})
        }
    }
};



