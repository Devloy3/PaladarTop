fetch("http://127.0.0.1:8000/api/restaurantes")
.then(response => {
    if (!response.ok){
        throw new Error("Ha fallado la API");
    }
    return response.json();
})
.then(data => {
    const tabla = document.getElementById("contenedor");
    data.forEach(element => {
      const fila = document.createElement("tr")
      const columna = document.createElement("td")
      const columna_2 = document.createElement("td")
      const columna_3 = document.createElement("td")
      const columna_4 = document.createElement("td")
      const columna_5 = document.createElement("td")
      const columna_6 = document.createElement("td")
      
      columna_2.className = "text-sm"
      columna_3.className = "text-sm text-center"
      columna_4.className = "text-sm text-center"
      columna_5.className = "text-sm text-center"
      columna_6.className = "text-sm text-center"
      columna.className = "text-sm"

      columna.classList.add("nombre")
      columna_2.classList.add("decoracion")
      columna_3.classList.add("menu")
      columna_4.classList.add("comida")
      columna_5.classList.add("servicio")
      columna_6.classList.add("precio")

      
      const nombre = document.createElement("h6");
      nombre.className = "text-sm";

      const decoracion = document.createElement("span")
      decoracion.className = "text-xs font-weight-bold text-center"
      const menu = document.createElement("span")
      menu.className = "text-xs font-weight-bold text-center"
      const comida = document.createElement("span")
      comida.className = "text-xs font-weight-bold text-center"
      const servicio = document.createElement("span")
      servicio.className = "text-xs font-weight-bold text-center"
      const precio = document.createElement("span")
      precio.className = "text-xs font-weight-bold text-center"
      
      nombre.textContent = element.Restaurante;
      decoracion.textContent = element.Decoracion
      menu.textContent = element.Menu
      comida.textContent = element.Comida
      servicio.textContent = element.Servicio  
      precio.textContent = element.Precio  

      
      
      
      columna.appendChild(nombre)
      columna_2.appendChild(decoracion)
      columna_3.appendChild(menu)
      columna_4.appendChild(comida)
      columna_5.appendChild(servicio)
      columna_6.appendChild(precio)
      fila.appendChild(columna)
      fila.appendChild(columna_2)
      fila.appendChild(columna_3)
      fila.appendChild(columna_4)
      fila.appendChild(columna_5)
      fila.appendChild(columna_6)
      tabla.appendChild(fila)
      
    });
})