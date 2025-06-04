const id = localStorage.getItem('editUserId');

window.api.getUsers().then(users => {
  const user = users.find(u => u.id == id);
  if (user) {
    document.getElementById('id').value = user.id;
    document.getElementById('nombre').value = user.nombre;
    document.getElementById('email').value = user.email;
  }
});

document.getElementById('edit-user-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('id').value;
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;

  await window.api.updateUser({ id, nombre, email });
  window.location.href = 'index.html';
});
