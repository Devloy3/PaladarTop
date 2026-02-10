require('dotenv').config();
const cors = require("cors")
const express = require("express")
const app = express(); 
const RestaurantesRoutes = require("./routes/Restaurantes")

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/restaurantes', RestaurantesRoutes);

app.listen(8000, () => { 
    console.log('Servidor en http://localhost:8000'); 
}); 