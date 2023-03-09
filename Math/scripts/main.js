import("../../Components/navbar.js")
let selector = new turtle.Selector()
let spinner_1 = selector.getById("spinner1")
let container = selector.getById("container")

let name = getParameterByName("name")
if (!name || name == "null") {
	setTimeout(() => { window.location = origin }, 1000)
} else {
	import(`./${name}.js`)
		.then(() => {
			spinner_1.style.display = 'none'
			container.html = "<s-main></s-main>"
		})
		.catch((err) => {
			console.log(err);
			spinner_1.style.display = 'none'
			container.html = `
				<h1>☹️</h1>
				<h3>Cannot load tool !</h3>
				<br><br>
				<a class="btn btn-outline-normal" href="${origin}" > Return </a>
			`
		})


}