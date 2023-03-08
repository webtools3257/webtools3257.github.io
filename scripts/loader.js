async function loadListTool() {
	let response = await fetch(`${origin}/list_tools.json`)
	let text = await response.text()
	return JSON.parse(text)
}