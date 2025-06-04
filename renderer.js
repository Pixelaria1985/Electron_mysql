function renderUsers(users) {
    const tbody = document.querySelector('#user-table tbody');
    tbody.innerHTML = '';
  
    users.forEach(user => {
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.nombre}</td>
        <td>${user.email}</td>
        <td>
          <button onclick="editar(${user.id})">Modificar</button>
          <button onclick="eliminar(${user.id})">Eliminar</button>
        </td>
      `;
  
      tbody.appendChild(row);
    });
  }
  
  function editar(id) {
    localStorage.setItem('editUserId', id); // guardamos el id
    window.location.href = 'modificar.html';
  }
  
  function eliminar(id) {
    if (confirm('¿Eliminar este usuario?')) {
      window.api.deleteUser(id).then(loadUsers);
    }
  }
  
  function loadUsers() {
    window.api.getUsers().then(renderUsers);
  }
  
  loadUsers();
  