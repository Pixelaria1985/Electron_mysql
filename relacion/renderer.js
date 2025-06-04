window.api.getPersonas().then(personas => {
  const tabla = document.getElementById('tabla-personas');
  tabla.innerHTML = '';

  personas.forEach(p => {
    const fila = document.createElement('tr');

    const celdaNombre = document.createElement('td');
    celdaNombre.textContent = p.nombre;

    const celdaColor = document.createElement('td');
    celdaColor.textContent = p.color;
    celdaColor.style.color = p.color.toLowerCase();

    const celdaAcciones = document.createElement('td');
    const botonEditar = document.createElement('button');
    botonEditar.textContent = 'Editar';
    botonEditar.onclick = () => {
      window.location.href = `editar.html?id=${p.id}`;
    };

    celdaAcciones.appendChild(botonEditar);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaColor);
    fila.appendChild(celdaAcciones);
    tabla.appendChild(fila);
  });
});
