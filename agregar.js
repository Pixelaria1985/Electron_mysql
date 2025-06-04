document.getElementById('add-user-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
  
    await window.api.addUser(nombre, email);
    window.location.href = 'index.html';
  });
  