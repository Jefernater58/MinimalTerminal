const { app, BrowserWindow, ipcMain } = require("electron");
var exec = require("child_process").exec;
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

ipcMain.handle("input", async (event, input) => {
	return new Promise((resolve, reject) => {
		exec(input, (error, stdout, stderr) => {
			if (error) {
				resolve(error.message);
			} else if (stderr) {
				resolve(stderr);
			} else {
				resolve(stdout);
			}
		});
	});
});

ipcMain.handle("get-cwd", async (event) => {
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
