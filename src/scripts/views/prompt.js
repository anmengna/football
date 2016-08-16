var promptTpl=require("../template/prompt.string");

SPA.defineView("prompt",{
	html:promptTpl,
	plugins:["delegated"],
	bindActions:{
		"tap.close":function(){
			this.hide();
		}
	}
})