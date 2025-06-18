window.electronAPI.getCwd().then((cwd) => {
	document.getElementById("prompt-text").textContent = cwd;
});

function addLine(text) {
	const terminal = document.getElementById("terminal");

	if (text != "") {
		const line = document.createElement("p");
		line.textContent = text;
		line.className = "terminal-line";
		terminal.appendChild(line);
		terminal.scrollTop = terminal.scrollHeight;
	} else {
		const line = document.createElement("br");
		terminal.appendChild(line);
		terminal.scrollTop = terminal.scrollHeight;
	}
}

document
	.getElementById("command-input")
	.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			const input = document.getElementById("command-input").value;
			if (input.trim() !== "") {
				document.getElementById("command-input").value = "";

				addLine("> " + input);
				document.getElementById("prompt").style.display = "none";

				window.electronAPI.sendInput(input).then((output) => {
					var linesArray = output.split(/\r?\n/);
					for (let line of linesArray) {
						addLine(line);
						console.log(line);
					}

					addLine(document.getElementById("prompt-text").textContent);
					document
						.getElementById("prompt")
						.parentElement.appendChild(
							document.getElementById("prompt")
						);
					document.getElementById("prompt").style.display = "block";
					document.getElementById("command-input").focus();
				});
			}
		}
	});
