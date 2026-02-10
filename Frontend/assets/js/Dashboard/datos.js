function formulario(){
  document.getElementById("Formulario").addEventListener("submit", function(e){
  e.preventDefault()

  const formData = new FormData(this);

    fetch('http://localhost:8000/api/restaurantes/InsertarRestaurante', {
        method: 'POST',
        body: formData
    })
    .then(response => {
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
        return response.json(); 
    })
    .then(data => {
      console.log(data);
      this.reset()
      Grafico()
      Restaurantes()
      Notas()
    })
    .catch(error => {
      alert('Hubo un error al enviar los datos');
      console.error(error);
      });
  });
}

function Notas(){
  fetch("http://127.0.0.1:8000/api/restaurantes/NotaMedia")
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
}

function Grafico(){
  fetch("http://127.0.0.1:8000/api/restaurantes/NotaMediaFecha")
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
}

function Restaurantes() {
  fetch("http://127.0.0.1:8000/api/restaurantes/NotaMediaRestaurante")
  .then(response => {
      if (!response.ok){
          throw new Error("Ha fallado la API");
      }
      return response.json();
  })
  .then(data => {
      const tabla = document.getElementById("contenedor");
      tabla.innerHTML = "";
      data.forEach(element => {
        const fila = document.createElement("tr")
        const columna = document.createElement("td");
        columna.classList.add("hola");
        
        const columna_2 = document.createElement("td")
        columna_2.classList.add("notas", "text-sm");
        
        
        const division = document.createElement("div")
        division.className = "d-flex py-1 justify-center"
        
      const nombre = document.createElement("h6");
        nombre.className = "mb-0 text-sm";

        const nota = document.createElement("span")
        nota.className = "text-xs font-weight-bold"
        
        nombre.textContent = element.Restaurante;
        nota.textContent = element.Promedio;

        
        division.appendChild(nombre)
        columna.appendChild(division)
        fila.appendChild(columna)
        tabla.appendChild(fila)

        columna_2.appendChild(nota)
        fila.appendChild(columna_2)
        tabla.appendChild(fila)
        
      });
  })
}

formulario()
Notas()
Grafico()
Restaurantes()


let miGrafico = null;

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
                lineHeight: 3
              },
            }
          },
        },
      },
    })
  };