// Importa herramientas necesarias de Electron
const { contextBridge, ipcRenderer } = require('electron');

// Expone un objeto 'api' en el navegador (renderer), accesible desde window.api
contextBridge.exposeInMainWorld('api', {
  getUsers: () => ipcRenderer.invoke('get-users'),
  addUser: (nombre, email) => ipcRenderer.invoke('add-user', { nombre, email }),
  deleteUser: (id) => ipcRenderer.invoke('delete-user', id),
  updateUser: (user) => ipcRenderer.invoke('update-user', user)
});
