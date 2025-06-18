const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: true,
			contextIsolation: true,
		},
	});

	win.loadFile("web/index.html");
}

app.whenReady().then(createWindow);

ipcMain.on("input", (event, input) => {
	console.log("Received input:", input);
});

ipcMain.handle("get-cwd", (event) => {
	const cwd = process.cwd();
	return cwd;
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
