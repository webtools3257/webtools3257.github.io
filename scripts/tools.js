turtle.component({
	name:"s-main",
	render:function(){
		return `
		<div class="card" onclick=" window.location='./tool.html?group=${this.props.get("group")}&name=${this.props.get("name")}' ">
			<div class="card-content item">
			<img src="${this.props.get("icon")}" alt="" class="img-icon">
				${this.props.get("text")}
			</div>
		</div>
		<br>
		`
	}
})