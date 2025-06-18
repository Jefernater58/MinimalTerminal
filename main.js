const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const os = require("os");
const pty = require("node-pty");

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	win.loadFile("web/index.html");
}

app.whenReady().then(createWindow);

ptyProcess = pty.spawn(os.platform() === "win32" ? "cmd.exe" : "bash", [], {
	name: "xterm-color",
	cols: 80,
	rows: 30,
	cwd: process.env.HOME,
	env: process.env,
});

// Send shell output to renderer
ptyProcess.onData((data) => {
	win.webContents.send("terminal-incData", data);
});

// Receive input from renderer
ipcMain.on("terminal-toShell", (event, input) => {
	ptyProcess.write(input);
});

ipcMain.on("terminal-resize", (event, { cols, rows }) => {
	ptyProcess.resize(cols, rows);
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
