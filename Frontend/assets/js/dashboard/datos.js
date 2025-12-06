document.getElementById("Formulario").addEventListener("submit", function(e){
 e.preventDefault()

 const formData = new FormData(this);

    fetch('http://localhost:3000/insertar_restaurante', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      return response.json(); 
    })
    .then(data => {
      alert('Restaurante insertado correctamente');
      console.log(data);
    })
    .catch(error => {
      alert('Hubo un error al enviar los datos');
      console.error(error);
    });
});

fetch("http://127.0.0.1:3000/nota")
.then(response => {
    if (!response.ok){
        throw new Error("Ha fallado la API");
    }
    return response.json();
})
.then(data => {
    puntuacion = document.getElementById("Puntuacion")
    puntuacion.textContent = data["Nota"]
})
.catch(error => {
        console.log("Fallo en el envio de nota", error);
});

fetch("http://127.0.0.1:3000/nota_fecha")
.then(response => {
    if (!response.ok){
        throw new Error("Ha fallado la API");
    }
    return response.json();
})
.then(data => {
    const notas = [];
    const fechas = [];

    data.forEach(item => {
        notas.push(item.Nota);
        fechas.push(item.Fecha);
    });

    grafico(fechas, notas);
})

fetch("http://127.0.0.1:3000")
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
      columna_2.className = "text-sm"
      
      
      const division = document.createElement("div")
      division.className = "d-flex px-2 py-1"
      
      const division_2 = document.createElement("div");
      division_2.className = "d-flex flex-column justify-content-center";
      
      const nombre = document.createElement("h6");
      nombre.className = "mb-0 text-sm";

      const nota = document.createElement("span")
      nota.className = "text-xs font-weight-bold"
      
      nombre.textContent = element.Nombre || element.nombre;
      nota.textContent = element.Nota 

      division_2.appendChild(nombre)
      division.appendChild(division_2)
      columna.appendChild(division)
      fila.appendChild(columna)
      tabla.appendChild(fila)

      columna_2.appendChild(nota)
      fila.appendChild(columna_2)
      tabla.appendChild(fila)
      
    });
})



function grafico(fecha,nota) {
  
  var ctx2 = document.getElementById("chart-line").getContext("2d");
  
    var gradientStroke2 = ctx2.createLinearGradient(0, 230, 0, 50);

    gradientStroke2.addColorStop(1, 'rgba(20,23,39,0.2)');
    gradientStroke2.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke2.addColorStop(0, 'rgba(20,23,39,0)'); //purple colors

    new Chart(ctx2, {
      type: "line",
      data: {
        labels: fecha,
        datasets: [{
          label: "Promedio",
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#3A416F",
          borderWidth: 3,
          backgroundColor: gradientStroke2,
          fill: true,
          data: nota,
          maxBarThickness: 6
        },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          }
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5]
            },
            ticks: {
              display: true,
              padding: 10,
              color: '#000000ff',
              font: {
                size: 11,
                family: "Inter",
                style: 'normal',
                lineHeight: 2
              },
            }
          },
          x: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
              borderDash: [5, 5]
            },
            ticks: {
              display: true,
              color: '#000000ff',
              padding: 20,
              font: {
                size: 11,
                family: "Inter",
                style: 'normal',
                lineHeight: 2
              },
            }
          },
        },
      },
    })
  };