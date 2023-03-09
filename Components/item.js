turtle.component({
	name: "s-item",
	render: function() {
		return `
		<div class="card animate__animated animate__fadeInUp" onclick=" window.location='./${this.props.get("group")}/index.html?name=${this.props.get("name")}' ">
			<div class="card-content item">
			<img src="${this.props.get("icon")}" alt="" class="img-icon">
				${this.props.get("text")}
			</div>
		</div>
		<br>
		`
	}
})
