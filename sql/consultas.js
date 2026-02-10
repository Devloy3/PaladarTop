module.exports = {
    Insertar: "INSERT INTO restaurantes(Restaurante,Decoracion,Menu,Comida,Servicio,Precio) VALUES (?,?,?,?,?,?);",
    Mostrar: "SELECT Restaurante,Decoracion,Menu,Comida,Servicio,Precio FROM restaurantes;",
    Promedio: "SELECT Restaurante, ROUND((Decoracion+Menu+Comida+Servicio+Precio)/5) AS Promedio FROM restaurantes ORDER BY Promedio DESC;",
    PromedioTotal: "SELECT (AVG(Decoracion)+AVG(Menu)+AVG(Comida)+AVG(Servicio)+AVG(Precio))/5 AS Nota FROM restaurantes;",
    CreateNotasMedias1: "SELECT NotaMedia FROM NotasMedias WHERE Fecha=? ORDER BY rowid DESC LIMIT 1;",
    CreateNotasMedias2: "INSERT INTO NotasMedias(Fecha,NotaMedia) VALUES (?,?);",
    NotasMedias: "SELECT Fecha, NotaMedia AS Nota FROM NotasMedias ORDER BY Fecha ASC LIMIT 5;",
    CantidadRestaurantesInsertados: "INSERT INTO RestaurantesAñadidos(Fecha,Cantidad) VALUES (?,?);"
}