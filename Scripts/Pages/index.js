import("../../Components/navbar.js")
import("../../Components/item.js")

let selector = new turtle.Selector()
let spinner_1 = selector.getById("spinner1")
let container = selector.getById("container")


loadListTool()
	.then((list) => {
		spinner_1.style.display = "none"
		Object.keys(list.groups).forEach(g => {
			g = list.groups[g]
			let doc = turtle.createElement("div")
			doc.html += `
					<h3>${g.name.toUpperCase()}</h3>
					<hr>
					<br>
				`
			g.tools.forEach((name) => {
				doc.html += `
						<s-item group="${g.name}"  name="${name.name}" text="${name.description}"  icon="${name.icon}"></s-item>
					`
			})
			container.dom.appendChild(doc.dom)
		})
	})