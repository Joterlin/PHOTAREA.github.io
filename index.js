function mostrarSeccion(id, boton) {
  // Ocultar todas las secciones
  document.querySelectorAll('.seccion').forEach(sec => {
    sec.style.opacity = "0";
    sec.style.transition = "opacity 0.4s ease";
    setTimeout(() => { sec.style.display = "none"; }, 400);
  });

  // Mostrar la nueva sección
  const seccion = document.getElementById(id);
  setTimeout(() => {
    seccion.style.display = "block";
    setTimeout(() => { seccion.style.opacity = "1"; }, 50);
  }, 400);

  // Botón activo
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  boton.classList.add('active');
}

/* -------- LIGHTBOX SECCIONAL -------- */
document.addEventListener("DOMContentLoaded", () => {

  // Crear lightbox
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  document.body.appendChild(lightbox);

  const imgGrande = document.createElement("img");
  lightbox.appendChild(imgGrande);

  const btnPrev = document.createElement("button");
  btnPrev.innerHTML = "&#10094;";
  btnPrev.className = "nav-btn prev";
  const btnNext = document.createElement("button");
  btnNext.innerHTML = "&#10095;";
  btnNext.className = "nav-btn next";

  lightbox.appendChild(btnPrev);
  lightbox.appendChild(btnNext);

  // Estilos
  Object.assign(lightbox.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: "0",
    transition: "opacity 0.6s ease",
    pointerEvents: "none",
    zIndex: "1000"
  });

  Object.assign(imgGrande.style, {
    maxWidth: "85%",
    maxHeight: "85%",
    borderRadius: "12px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.7)",
    transform: "scale(0.5) rotate(-10deg)",
    opacity: "0",
    transition: "transform 0.5s ease, opacity 0.5s ease"
  });

  // Botones
  [btnPrev, btnNext].forEach(btn => {
    Object.assign(btn.style, {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgba(0,0,0,0.6)",
      border: "none",
      color: "#fff",
      fontSize: "40px",
      padding: "12px",
      cursor: "pointer",
      borderRadius: "50%",
      transition: "background 0.3s"
    });
    btn.onmouseover = () => btn.style.background = "rgba(198,40,40,0.8)";
    btn.onmouseout = () => btn.style.background = "rgba(0,0,0,0.6)";
  });
  btnPrev.style.left = "30px";
  btnNext.style.right = "30px";

  // Variables
  let indiceActual = 0;
  let seccionActualImgs = [];

  // Función para mostrar imagen
  function mostrarImagen(index) {
    indiceActual = (index + seccionActualImgs.length) % seccionActualImgs.length; // loop circular
    imgGrande.src = seccionActualImgs[indiceActual].src;
    imgGrande.style.opacity = "0";
    imgGrande.style.transform = "scale(0.5) rotate(-10deg)";
    setTimeout(() => {
      imgGrande.style.opacity = "1";
      imgGrande.style.transform = "scale(1) rotate(0deg)";
    }, 50);
  }

  // Abrir lightbox
  document.querySelectorAll(".galeria img").forEach((img, i) => {
    img.addEventListener("click", (e) => {
      const seccion = img.closest(".seccion");
      seccionActualImgs = Array.from(seccion.querySelectorAll("img"));
      indiceActual = seccionActualImgs.indexOf(img);
      mostrarImagen(indiceActual);

      lightbox.style.opacity = "1";
      lightbox.style.pointerEvents = "auto";
    });
  });

  // Navegar
  btnPrev.addEventListener("click", e => { e.stopPropagation(); mostrarImagen(indiceActual - 1); });
  btnNext.addEventListener("click", e => { e.stopPropagation(); mostrarImagen(indiceActual + 1); });

  // Teclado
  document.addEventListener("keydown", e => {
    if (lightbox.style.pointerEvents === "auto") {
      if (e.key === "ArrowLeft") mostrarImagen(indiceActual - 1);
      if (e.key === "ArrowRight") mostrarImagen(indiceActual + 1);
      if (e.key === "Escape") cerrarLightbox();
    }
  });

  // Cerrar
  function cerrarLightbox() {
    imgGrande.style.transform = "scale(0.3) rotate(15deg)";
    imgGrande.style.opacity = "0";
    setTimeout(() => {
      lightbox.style.opacity = "0";
      lightbox.style.pointerEvents = "none";
    }, 300);
  }

  lightbox.addEventListener("click", cerrarLightbox);
});

function playClickSound() {
  const audio = new Audio("click.mp3"); // asegúrate de tener este archivo
  audio.volume = 0.5;
  audio.play();
}
