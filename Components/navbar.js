turtle.component({
	name:"s-navbar",
	render:function(){
		return `
			<nav class="navbar" id="navbar1">
				<h4 class="navbar-title" style="font-size:16px;" >Web Tools</h4>
				<ul class="navbar-items" style="padding: 5px;"  >
					<button class="navbar-mobile-btn-close">
						<i class="fa fa-times " style="font-size: 20px;" data-control="navbar" data-action="toggle" data-navbar="#navbar1"></i>
					</button>
					<li><a href="${origin}/index.html">Home</a></li>
					<li><a href="${origin}/report.html">Report</a></li>
				</ul>
				<button data-control="navbar" data-action="toggle" data-navbar="#navbar1" class="navbar-mobile-btn-close">
					<i class="fa fa-bars " style="font-size: 20px;" data-control="navbar" data-action="toggle" data-navbar="#navbar1"></i>
				</button>
			</nav>
		`
	}
})

