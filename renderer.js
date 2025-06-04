// Función que recibe la lista de usuarios y los dibuja en la tabla del HTML
function renderUsers(users) {
    const tbody = document.querySelector('#user-table tbody');
    tbody.innerHTML = '';
  
    users.forEach(user => {
      const row = document.createElement('tr');
  
      // Inserta el contenido HTML de cada celda de la fila
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.nombre}</td>
        <td>${user.email}</td>
        <td>
          <button onclick="editar(${user.id})">Modificar</button>
          <button onclick="eliminar(${user.id})">Eliminar</button>
        </td>
      `;
  
      tbody.appendChild(row); // Agrega la fila al cuerpo de la tabla
    });
  }
  
  // Función que se ejecuta al presionar "Modificar"
  function editar(id) {
    localStorage.setItem('editUserId', id); // guardamos el id
    window.location.href = 'modificar.html';
  }
  
  // Función que se ejecuta al presionar "Eliminar"
  function eliminar(id) {
    if (confirm('¿Eliminar este usuario?')) {
      window.api.deleteUser(id).then(loadUsers);
    }
  }
  
  // Función que carga los usuarios desde el backend
  function loadUsers() {
    window.api.getUsers().then(renderUsers);
  }
  
  // Llama a loadUsers automáticamente al cargar el archivo
  loadUsers();
  