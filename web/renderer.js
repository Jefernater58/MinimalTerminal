const term = new Terminal();
term.open(document.getElementById("terminal"));

term.onData((data) => {
	window.electronAPI.sendInput(data);
});

window.electronAPI.onTerminalData((data) => {
	term.write(data);
});

// Optional: Auto-resize support
window.addEventListener("resize", () => {
	const cols = term.cols;
	const rows = term.rows;
	window.electronAPI.resize({ cols, rows });
});
