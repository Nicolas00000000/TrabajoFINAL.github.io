let propiedades = [];
const porPagina = 8;
let paginaActual = 1;
let totalPaginas = 1;




function renderCards() {
  const contenedor = document.getElementById("contenedor-cards");
  contenedor.innerHTML = "";

  const inicio = (paginaActual - 1) * porPagina;
  const fin = inicio + porPagina;
  const visibles = propiedades.slice(inicio, fin);

  visibles.forEach(prop => {
    contenedor.innerHTML += `
    
     
      <div class="col-md-3 cardCol">
        <div class="card h-100 shadow-sm" id="cardCol">
          <img src="${prop.img}" class="card-img-top" alt="${prop.titulo}">
          <div class="card-body cardBodyJS">
            <h5 class="card-title">${prop.titulo}</h5>
            <p class="card-text">${prop.precio}</p>
          </div>
          <a href="detalle.html?id=${prop.id}" class="stretched-link"></a>
        </div>
      </div>
    `;
  });
}

function renderPaginacion() {
  const paginacion = document.getElementById("paginacion");
  paginacion.innerHTML = "";

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = "btn btn-outline-primary mx-1";
    if (i === paginaActual) btn.classList.add("active");
    btn.addEventListener("click", () => {
      paginaActual = i;
      renderCards();
      renderPaginacion();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    paginacion.appendChild(btn);
  }
}

function cargarPropiedades() {
  fetch('data/propiedades.json')
    .then(response => response.json())
    .then(data => {
      propiedades = data;
      totalPaginas = Math.ceil(propiedades.length / porPagina);
      renderCards();
      renderPaginacion();
    })
    .catch(error => {
      console.error('Error cargando propiedades:', error);
      const contenedor = document.getElementById("contenedor-cards");
      contenedor.innerHTML = "<p class='text-danger'>Error cargando propiedades.</p>";
    });
}

// Ejecutar la carga al cargar el DOM
document.addEventListener("DOMContentLoaded", cargarPropiedades);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Alteracion de cursor

const cursor = document.getElementById("cursor");

const colors = [
    "#ffffff"
];

let colorIndex = 0;

document.addEventListener("mousemove", (e) => {

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

});

setInterval(() => {

    colorIndex = (colorIndex + 1) % colors.length;

    const color = colors[colorIndex];

    cursor.style.background = color;

    cursor.style.boxShadow = `
        0 0 10px ${color},
        0 0 20px ${color},
        0 0 40px ${color}
    `;

}, 800);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cola de cursor

let lastX = 0;
let lastY = 0;

document.addEventListener("mousemove", (e) => {

    for(let i = 0; i < 5; i++) {

        const x = lastX + (e.clientX - lastX) * (i / 5);
        const y = lastY + (e.clientY - lastY) * (i / 5);

        const trail = document.createElement("div");

        trail.classList.add("trail");

        trail.style.left = x + "px";
        trail.style.top = y + "px";

        document.body.appendChild(trail);

        setTimeout(() => {
            trail.remove();
        }, 1000);
    }

    lastX = e.clientX;
    lastY = e.clientY;

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Sonido de fondo
const music = document.getElementById("bgMusic");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");

playBtn.addEventListener("click", () => {
    music.play();
});

pauseBtn.addEventListener("click", () => {
    music.pause();
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// RICKARD JOAQUIN NICOLAS
// DNI:39395009
