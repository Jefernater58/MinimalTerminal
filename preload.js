const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	sendInput: (data) => ipcRenderer.send("input", data),
	getCwd: () => ipcRenderer.invoke("get-cwd"),
});
