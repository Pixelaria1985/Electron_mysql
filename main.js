const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const mysql = require('mysql2/promise');

async function getConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'usuaritos'
  });
}

async function getUsers() {
  const conn = await getConnection();
  const [rows] = await conn.execute('SELECT * FROM usuarios');
  await conn.end();
  return rows;
}

async function addUser(user) {
  const conn = await getConnection();
  await conn.execute('INSERT INTO usuarios (nombre, email) VALUES (?, ?)', [user.nombre, user.email]);
  await conn.end();
}

async function deleteUser(id) {
  const conn = await getConnection();
  await conn.execute('DELETE FROM usuarios WHERE id = ?', [id]);
  await conn.end();
}

async function updateUser(user) {
  const conn = await getConnection();
  await conn.execute('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?', [user.nombre, user.email, user.id]);
  await conn.end();
}

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile('index.html');
}

ipcMain.handle('get-users', getUsers);
ipcMain.handle('add-user', (event, user) => addUser(user));
ipcMain.handle('delete-user', (event, id) => deleteUser(id));
ipcMain.handle('update-user', (event, user) => updateUser(user));

app.whenReady().then(createWindow);
