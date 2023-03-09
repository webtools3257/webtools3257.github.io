let eq = getParameterByName("eq")
const mj = function(tex) {
	return MathJax.tex2svg(tex, { em: 16, ex: 6, display: false });
}

function parseExpr(expression) {
	try {
		let node = null
		node = math.parse(expression)
		return node
	} catch (e) {}

}


function displayMathFormula(element, node) {
	try {
		const latex = node ? node.toTex({ parenthesis: true }) : ''
		MathJax.typesetClear();
		element.innerHTML = '';
		element.appendChild(mj(latex));
	}
	catch (err) {
		return expr
	}
}

function evalExpr(expression) {
	try {
		let e = nerdamer(expression);
		let value = nerdamer.expressions(true, true)[1]
		nerdamer.clear('all');
		return { err: false, result: value }
	} catch (err) {
		return { err: true, cause: err }
	}
}



turtle.component({
	name: "s-main",
	afterRender: function() {
		let expr = document.getElementById("expr")
		let getLinkBtn = document.getElementById("btnGetLink")
		let linkDisplay = document.getElementById("link")

		function main() {
			let node = parseExpr(expr.value)
			displayMathFormula(pretty, node)
			expr.classList.remove("invalid")
			expr.classList.remove("success")
			let res = evalExpr(expr.value)
			if (res.err) {
				result.innerHTML = "Error !"
				expr.classList.add("invalid")
			} else {
				expr.classList.add("success")
				MathJax.typesetClear();
				result.innerHTML = '';
				result.appendChild(mj(res.result))
			}
		}

		function getLink() {
			let link = `${window.location.origin}/Math/index.html?name=algebra_calc&?eq=${expr.value}`
				linkDisplay.innerHTML = `Your Link : <a href="${link}"> ${link}</a>`

			try {
				navigator.clipboard.writeText(`${window.location}&?eq=${expr.value}`);
				alert("Copied !")
			} catch (e) {
							}
		}


		if (eq) {
			expr.value = eq
			main()
		}
		expr.oninput = function() {
			linkDisplay.innerHTML = ""
			main()
		}
		getLinkBtn.onclick = getLink
	},
	render: function() {
		return `
		<div id="link" ></div>
		
		<h3>Input the expression</h3>
		<div class="card" >
			<div class="card-content item">
				<input style="width:100%;"   class='input-field' id="expr" >
			</div>
		</div>
		<br>
		<h3>Expression</h3>
		<div class="card" >
			<div class="card-content item" id="pretty" >
			</div>
		</div>
		<br>
		
		<h3>Result </h3> 
		<div class = "card" >
			<div class="card-content item" id="result" >
			</div> 
		</div>
		<br>
		<button id="btnGetLink" class="btn btn-outline-success"  >Copy link</button>
		`
	}
})