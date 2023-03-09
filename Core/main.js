const origin = window.location.origin
const DEV_MODE = true

function getParameterByName(name, url = window.location.href) {
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function printError(err) {
	if (DEV_MODE) {
		console.log(err);
	}
}

async function loadListTool() {
	let response = await fetch(`${origin}/list_tool.json`)
	let text = await response.text()
	try {
		return new ListTool(JSON.parse(text))
	} catch (e) {
		printError(e)
	}
}

function getAllToolGroup(tools) {
	return Object.keys(tools)
}

class ListTool {
	constructor(list) {
		this.list = list
		this.getAllToolGroup()
	}

	getAllToolGroup() {
		let groups = {}
		this.list.forEach(t => {

			if (groups[t.group]) {
				groups[t.group].addTool(new Tool(t))
			} else {
				groups[t.group] = new ToolGroup(t.group)
				groups[t.group].addTool(new Tool(t))
			}
		})
		this.groups = groups
	}
	find(group,tool_name){
		let res = false
		Object.keys(this.groups).forEach(g=>{
			if (g == group) {
				res = this.groups[g].find(tool_name)
			}
		})
		return res
	}
}

class ToolGroup {
	constructor(name) {
		this.name = name
		this.tools = []
	}

	addTool(tool) {
		this.tools.push(tool)
	}

	find(tool_name) {
		let res = false
		this.tools.forEach(t => {
			if (t.name == tool_name) { res = t }
		})
		return res
	}

}


class Tool {
	constructor(configs) {
		this.name = configs.name
		this.description = configs.description
		this.path = configs.path
		this.icon = configs.icon
		this.group = configs.group
	}

	open() {
		window.location = `${origin}/tool.html?group=${this.group}&name=${this.name}`
	}

	
}