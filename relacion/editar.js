// Obtener parámetros de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
document.getElementById('persona-id').value = id;

// Obtener datos y llenar formulario
window.api.getPersonaPorId(id).then(data => {
  document.getElementById('nombre').value = data.nombre;
  cargarColores(data.color_id);
});

// Cargar colores disponibles
function cargarColores(colorIdActual) {
  window.api.getColores().then(colores => {
    const select = document.getElementById('color');
    select.innerHTML = '';
    colores.forEach(c => {
      const option = document.createElement('option');
      option.value = c.id;
      option.textContent = c.color;
      if (c.id === colorIdActual) option.selected = true;
      select.appendChild(option);
    });
  });
}

// Guardar cambios
document.getElementById('form-edicion').addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('persona-id').value;
  const nombre = document.getElementById('nombre').value;
  const colorId = document.getElementById('color').value;
  window.api.actualizarPersona({ id, nombre, color_id: colorId }).then(() => {
    window.location.href = 'index.html';
  });
});
