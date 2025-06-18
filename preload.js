const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	sendInput: (data) => ipcRenderer.invoke("input", data),
	getCwd: () => ipcRenderer.invoke("get-cwd"),
});
