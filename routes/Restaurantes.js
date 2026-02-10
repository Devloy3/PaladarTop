const express = require("express")
const routes = express.Router()
const controller = require("../controllers/RestaurantesController")


routes.get("/",controller.Mostrar)
routes.get("/NotaMedia*Restaurante",controller.Promedio)
routes.post("/InsertarRestaurante",controller.Insertar,controller.RestaurantesInsertados)
routes.get("/NotaMediaFecha",controller.NotasMedias1,controller.NotasMedias2)
routes.get("/NotaMedia",controller.PromedioTotal)

module.exports = routes;