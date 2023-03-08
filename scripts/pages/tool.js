let selector = new turtle.Selector()
let spinner_1 = selector.getById("spinner1")
let container = selector.getById("container")

function getParameterByName(name, url = window.location.href) {
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


let group = getParameterByName("group")
let name = getParameterByName("name")

if ((!group || !name) || (group == 'null' || name == "null")) {
	setTimeout(() => { window.location = "./index.html" }, 1000)
} else {
	loadListTool()
		.then((list) => {
			Object.keys(list).forEach(g => {
				if (g == group) {
					list[g].forEach(n => {
						if (n.name == name) {
							import(`${origin}/tools/${group}/${name}.js`)
								.then(() => {
									spinner_1.style.display = 'none'
									container.html = "<s-main></s-main>"
								})

								.catch(() => {
									spinner_1.style.display = 'none'
									container.html = `
										<h3>Cannot load tool !</h3>
										<br><br>
										<a class="btn btn-outline-normal" href="./index.html" > Return </a>
									`
								})
						}
					})
				}
			})
		})
}