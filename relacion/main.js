const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const mysql = require('mysql2');

// Conexión MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'relacion'
});

// Crear ventana principal
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

// IPC Handlers
ipcMain.handle('get-personas', async () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT nombres.id, nombres.nombre, colores.color, colores.id AS color_id
       FROM nombres 
       JOIN colores ON nombres.color_id = colores.id`,
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
});

ipcMain.handle('get-persona-id', async (_, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT id, nombre, color_id FROM nombres WHERE id = ?`,
      [id],
      (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      }
    );
  });
});

ipcMain.handle('get-colores', async () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT id, color FROM colores`, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
});

ipcMain.handle('update-persona', async (_, persona) => {
  const { id, nombre, color_id } = persona;
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE nombres SET nombre = ?, color_id = ? WHERE id = ?`,
      [nombre, color_id, id],
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
});
