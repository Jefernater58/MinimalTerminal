window.electronAPI.sendInput("test input");

window.electronAPI.getCwd().then((cwd) => {
	document.getElementById("prompt-text").textContent = cwd + ">";
});
