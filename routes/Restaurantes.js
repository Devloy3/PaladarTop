const express = require("express")
const routes = express.Router()

routes.get("/NotaMedia*Restaurante")
routes.post("/InsertarRestaurante")
routes.get("/NotaFecha")
routes.get("/Nota")

module.exports = routes;