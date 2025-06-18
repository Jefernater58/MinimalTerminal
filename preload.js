const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	sendInput: (data) => ipcRenderer.send("input", data),
});
