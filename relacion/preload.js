const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getPersonas: () => ipcRenderer.invoke('get-personas'),
  getPersonaPorId: (id) => ipcRenderer.invoke('get-persona-id', id),
  getColores: () => ipcRenderer.invoke('get-colores'),
  actualizarPersona: (persona) => ipcRenderer.invoke('update-persona', persona)
});
