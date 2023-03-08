let selector = new turtle.Selector()
let spinner_1 = selector.getById("spinner1")
let container = selector.getById("container")


loadListTool()
		.then((list) => {
			spinner_1.style.display = "none"
			Object.keys(list).forEach(g => {
				let doc = turtle.createElement("div")
				doc.html += `
					<h3>${g.toUpperCase()}</h3>
					<hr>
					<br>
				`	
				list[g].forEach((name)=>{
					doc.html+=`
						<s-item group="${g}"  name="${name.name}" text="${name.description}"  icon="${name.icon}"></s-item>
					`
				})
				container.dom.appendChild(doc.dom)
			})
		})