let propiedades = [];
const porPagina = 8;
let paginaActual = 1;
let totalPaginas = 1;
let propiedadesFiltradas = [];

function filtrarPropiedades() {
  const ubicacionFiltro = document.getElementById("filtro-ubicacion").value.trim().toLowerCase();
  const tipoFiltro = document.getElementById("filtro-tipo").value;
  const operacionFiltro = document.getElementById("filtro-operacion").value;
  const precioFiltro = document.getElementById("filtro-precio").value;

  return propiedades.filter(prop => {
    if (ubicacionFiltro && !prop.ubicacion.toLowerCase().includes(ubicacionFiltro)) return false;
    if (tipoFiltro && tipoFiltro !== "" && !prop.titulo.toLowerCase().includes(tipoFiltro.toLowerCase())) return false;
    if (operacionFiltro && operacionFiltro !== "" && prop.tipo !== operacionFiltro) return false;

    if (precioFiltro && precioFiltro !== "") {
      const precioNum = prop.valor;
      if (precioFiltro === "1" && precioNum >= 50000) return false;
      if (precioFiltro === "2" && (precioNum < 50000 || precioNum > 100000)) return false;
      if (precioFiltro === "3" && precioNum <= 100000) return false;
    }

    return true;
  });
}

function renderCards() {
  const contenedor = document.getElementById("contenedor-cards");
  contenedor.innerHTML = "";

  const inicio = (paginaActual - 1) * porPagina;
  const fin = inicio + porPagina;
  const visibles = propiedadesFiltradas.slice(inicio, fin);

  if (visibles.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron propiedades con esos filtros.</p>";
    return;
  }

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
      propiedadesFiltradas = propiedades;
      totalPaginas = Math.ceil(propiedadesFiltradas.length / porPagina);
      renderCards();
      renderPaginacion();
    })
    .catch(error => {
      console.error('Error cargando propiedades:', error);
      const contenedor = document.getElementById("contenedor-cards");
      contenedor.innerHTML = "<p class='text-danger'>Error cargando propiedades.</p>";
    });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarPropiedades();

  document.getElementById("btn-filtrar").addEventListener("click", () => {
    paginaActual = 1;
    propiedadesFiltradas = filtrarPropiedades();
    totalPaginas = Math.ceil(propiedadesFiltradas.length / porPagina);
    renderCards();
    renderPaginacion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
////////////////////////////////////////////////////////////////////////////
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

// RICKARD JOAQUIN NICOLAS
// DNI:39395009