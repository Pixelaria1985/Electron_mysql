const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getUsers: () => ipcRenderer.invoke('get-users'),
  addUser: (nombre, email) => ipcRenderer.invoke('add-user', { nombre, email }),
  deleteUser: (id) => ipcRenderer.invoke('delete-user', id),
  updateUser: (user) => ipcRenderer.invoke('update-user', user)
});
