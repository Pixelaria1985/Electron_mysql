// Importa los módulos necesarios de Electron y Node.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const mysql = require('mysql2/promise');

// Función para establecer la conexión con la base de datos
async function getConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'usuaritos'
  });
}

// Obtiene todos los usuarios desde la base de datos
async function getUsers() {
  const conn = await getConnection();
  const [rows] = await conn.execute('SELECT * FROM usuarios');
  await conn.end();
  return rows;
}

// Agrega un nuevo usuario a la base de datos
async function addUser(user) {
  const conn = await getConnection();
  await conn.execute('INSERT INTO usuarios (nombre, email) VALUES (?, ?)', [user.nombre, user.email]);
  await conn.end();
}

// Elimina un usuario por ID
async function deleteUser(id) {
  const conn = await getConnection();
  await conn.execute('DELETE FROM usuarios WHERE id = ?', [id]);
  await conn.end();
}

// Actualiza un usuario existente
async function updateUser(user) {
  const conn = await getConnection();
  await conn.execute('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?', [user.nombre, user.email, user.id]);
  await conn.end();
}

// Crea la ventana principal de la aplicación
function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Carga preload para comunicación segura
      contextIsolation: true, // Aísla el contexto para mayor seguridad
      nodeIntegration: false // Desactiva acceso a Node.js en renderer por seguridad
    }
  });

  win.loadFile('index.html'); // Carga la página principal
}

// Maneja eventos IPC que vienen desde el renderer (frontend)
ipcMain.handle('get-users', getUsers); // Cuando se pide 'get-users', ejecuta getUsers
ipcMain.handle('add-user', (event, user) => addUser(user)); // Para agregar usuario
ipcMain.handle('delete-user', (event, id) => deleteUser(id)); // Para eliminar usuario
ipcMain.handle('update-user', (event, user) => updateUser(user)); // Para actualizar usuario

// Inicia la app cuando esté lista y crea la ventana
app.whenReady().then(createWindow);
