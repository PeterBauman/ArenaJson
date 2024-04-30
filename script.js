// Seleccionar el contenedor SVG
const svg = d3.select("svg");

// Variable para el seguimiento del estado del menú
let isSubMenuVisible = false;

// Crear elemento de audio para el sonido del teléfono
const telefonoAudio = new Audio("telefono.mp3");

// Función para mostrar los subbotones al hacer clic en el botón del medio o para ocultarlos si ya están visibles
function toggleSubMenu() {
  // Alternar la visibilidad de los subbotones
  if (!isSubMenuVisible) {
    // Mostrar los subbotones con una transición suave
    subCircles.transition().duration(500).style("opacity", 1).attr("r", 50);
    subCircleText.transition().duration(500).style("opacity", 1);
    isSubMenuVisible = true;
  } else {
    // Ocultar los subbotones con una transición suave
    subCircles.transition().duration(500).style("opacity", 0).attr("r", 0);
    subCircleText.transition().duration(500).style("opacity", 0);
    isSubMenuVisible = false;
  }
}

// Función para volver al menú principal
function backToMain() {
  // Mostrar el círculo principal
  mainCircle.style("opacity", 1);
  // Ocultar los círculos secundarios y sus imágenes con una transición suave
  subCircles.transition().duration(500).style("opacity", 0).attr("r", 0);
  subCircleText.transition().duration(500).style("opacity", 0);
  // Restablecer el estado del menú
  isSubMenuVisible = false;
}

// Función para manejar el clic en cada subcírculo y reproducir el audio
function handleSubcircleClick(data) {
    // Reproducir el sonido del teléfono
    telefonoAudio.currentTime = 0; // Reiniciar la reproducción si ya está en curso
    telefonoAudio.play();
}

// Cargar datos desde el archivo JSON
d3.json("circles.json").then(function(data) {
  // Calcular el ángulo entre cada submenú
  const angleStep = (2 * Math.PI) / data.length;
  
  // Agregar los subbotones con texto
  subCircles = svg.selectAll(".subCircle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "subCircle")
    .attr("cx", (d, i) => 200 + 150 * Math.cos(angleStep * i))
    .attr("cy", (d, i) => 200 + 150 * Math.sin(angleStep * i))
    .attr("r", 0)
    .attr("fill", "lightgreen")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .style("opacity", 0)
    .on("click", handleSubcircleClick);

  // Agregar texto a cada subbotón
  subCircleText = svg.selectAll(".subCircleText")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "subCircleText")
    .attr("x", (d, i) => 200 + 150 * Math.cos(angleStep * i))
    .attr("y", (d, i) => 200 + 150 * Math.sin(angleStep * i))
    .attr("dy", ".35em")
    .text(d => d.text)
    .style("font-size", "14px")
    .style("text-anchor", "middle")
    .style("opacity", 0)
    .style("pointer-events", "none");
});

// Agregar el círculo principal al SVG
const mainCircle = svg.append("circle")
  .attr("cx", 200)
  .attr("cy", 200)
  .attr("r", 100)
  .attr("fill", "lightblue")
  .attr("stroke", "black")
  .attr("stroke-width", 2)
  .on("click", backToMain);

// Agregar texto al círculo principal
svg.append("text")
  .attr("x", 200)
  .attr("y", 200)
  .attr("dy", ".35em")
  .text("Estados de Ánimo")
  .style("font-size", "16px")
  .style("text-anchor", "middle")
  .style("fill", "black");

// Agregar el círculo del botón del medio al SVG
const middleCircle = svg.append("circle")
  .attr("cx", 200)
  .attr("cy", 200)
  .attr("r", 100)
  .attr("fill", "transparent")
  .attr("stroke", "transparent")
  .attr("stroke-width", 2)
  .on("click", toggleSubMenu); // Función para mostrar u ocultar los subbotones al hacer clic

// Agregar el botón al documento HTML
const button = document.createElement("button");
button.textContent = "Reproducir sonido de teléfono";
document.body.appendChild(button);

// Función para reproducir el sonido del teléfono al hacer clic en el botón
button.addEventListener("click", function() {
  telefonoAudio.currentTime = 0; // Reiniciar la reproducción si ya está en curso
  telefonoAudio.play();
});
