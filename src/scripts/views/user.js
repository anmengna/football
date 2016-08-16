var userTpl=require("../template/user.string");

SPA.defineView("user",{
	html:userTpl,
	plugins:["delegated"],
	bindActions:{
		"close.hide":function(){
			this.hide();
		},
		"goto.register":function(){
			/*console.log(e);*/
			SPA.open("register",{
				ani:{
					name:'actionSheet',
					distance:200
				}
				
			})
		}
	}
})