var guideTpl=require('../template/guide.string');

SPA.defineView('guide',{
	html:guideTpl,
	plugins:['delegated'],
	bindEvents:{
		beforeShow:function(){
			var mySwiper=new Swiper("#swiper-container");
		}
	},
	bindActions:{
		"go.index":function(){
			SPA.open("index");
		}
	}
})