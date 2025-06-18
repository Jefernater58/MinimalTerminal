const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	sendInput: (data) => ipcRenderer.send("terminal-toShell", data),
	onTerminalData: (callback) =>
		ipcRenderer.on("terminal-incData", (event, data) => callback(data)),
	resize: (size) => ipcRenderer.send("terminal-resize", size),
});
