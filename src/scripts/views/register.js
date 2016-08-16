var registerTpl=require("../template/register.string");

SPA.defineView("register",{
	html:registerTpl,
	plugins:['delegated'],
	bindActions:{
		"tap.cancel":function(){
			this.hide();
		},
		"tap.true":function(){
			//console.log($(".m-register input").val());
			if($(".m-register input").val()==""){
				SPA.open("prompt",{
					ani:{
						name:"dialog",
						width:280,
						height:100
					}
				})
			}else{
				this.hide();
			}
		}
	}
})