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
		expr.oninput = function() {
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
	},
	render: function() {
		return `
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
		<br >
		`
	}
})