document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  if (isNaN(id)) {
    document.getElementById("detalle").innerHTML = "<p>ID inválido.</p>";
    return;
  }

  try {
    const res = await fetch("data/propiedades.json");
    const propiedades = await res.json();
    const prop = propiedades[id];
    const contenedor = document.getElementById("detalle");

    if (prop) {
      let imagenesHTML = "";

      // Si hay varias imágenes, usar carrusel
      if (prop.imagenes && prop.imagenes.length > 0) {
        const carouselId = `carouselPropiedad${id}`;
        imagenesHTML = `
          <div id="${carouselId}" class="carousel slide mb-3" data-bs-ride="carousel" data-bs-interval="2000">
            <div class="carousel-inner carouselDetalle" >
              ${prop.imagenes.map((img, i) => `
                <div class="carousel-item carouselDetall ${i === 0 ? 'active' : ''}">
                  <img src="${img}" class="d-block w-100 img-fluid carouselDetalleImg" alt="${prop.titulo}"onclick="ampliarImagen('${img}')">
                </div>
              `).join("")}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
              <span class="carousel-control-prev-icon"></span>
              <span class="visually-hidden">Anterior</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
              <span class="carousel-control-next-icon"></span>
              <span class="visually-hidden">Siguiente</span>
            </button>
          </div>
          <div class="modal fade" id="modalImagen" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content bg-transparent border-0">
      <img id="imagenModalGrande" src="" class="img-fluid rounded" alt="Imagen ampliada">
    </div>
  </div>
</div>
        `;
      } else {
        // Imagen única (por compatibilidad)
        imagenesHTML = `<img src="${prop.img}" alt="${prop.titulo}" class="img-fluid mb-3" id="imgDetalle">`;
      }

      contenedor.innerHTML = `
        <h2 id="subTitulo">${prop.titulo}</h2>
        ${imagenesHTML}
        <p class="descripcionPre"><strong>Precio:</strong> ${prop.precio}</p>
        <p class="descripcionPro"><strong>Descripción:</strong> ${prop.descripcion || "Esta es una descripción genérica de la propiedad."}</p>
        <a href="index.html" class="btn btn-primary mt-3">Volver al inicio</a>
      `;
    } else {
      contenedor.innerHTML = "<p>Propiedad no encontrada.</p>";
    }
  } catch (error) {
    console.error("Error al cargar propiedades:", error);
    document.getElementById("detalle").innerHTML = "<p>Error al cargar los datos.</p>";
  }
});

  function ampliarImagen(src) {
    const modalImg = document.getElementById('imagenModalGrande');
    modalImg.src = src;
    const modal = new bootstrap.Modal(document.getElementById('modalImagen'));
    modal.show();
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////////
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

  // RICKARD JOAQUIN NICOLAS
// DNI:39395009