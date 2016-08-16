var indexTpl=require("../template/index.string");
SPA.defineView("index",{
	html:indexTpl,
	plugins:['delegated'],
	bindEvents:{
		show:function(){

		}
	},
	modules:[
		{
			name:"content",
			defaultTag:"home",
			views:["home","search","user"],
			container:".m_main"
		}
	],
	bindActions:{
		"switch.tabs":function(e,data){
			
			//console.log(data);
			$(e.el).addClass("active").siblings().removeClass("active");
			//console.log(this.modules);
			this.modules.content.launch(data.tag);	
		},
		"switch.quit":function(){
			this.hide();
		},
		"goto.user":function(){
			SPA.open("user",{
				ani:{
					name:"dialog",
					width:280,
					height:200
				}
			})
		}
	}
})