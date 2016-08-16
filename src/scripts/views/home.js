var homeTpl=require('../template/home.string');
var util=require('../util/util');
SPA.defineView("home",{
	html:homeTpl,
	plugins:["delegated",{
		name:"avalon",
		options:function(vm){
			vm.livelist=[];
		}
	}],
	//初始化;
	init:{
		vm:null,
		livelistArr:[],
		hotSwiper:null,
		homeSwiper:null,
		faramData:function(data){
			var templateArr=[];
			for(var i=0;len=(Math.ceil(data.length/2)),i<len;i++){
				templateArr[i]=[];
				templateArr[i].push(data[i*2],data[i*2+1]);
			}
			return templateArr;
		}
	},
	bindEvents:{
		beforeShow:function(){
			//获取视图;
			var that=this;
			//获取vm;
			that.vm=this.getVM();
			$.ajax({
				url:"/webappcourse/mock/livelist.json",
				//url:"/api/livelist.php",
				type:"get",
				data:{
					rtype:"origin"
				},
				success:function(e){
					//console.log(e);
					that.livelistArr=e.data;
					that.vm.livelist=that.faramData(e.data);
				},
				error:function(){
					console.log("加载失败");
				}
			});
		},
		show:function(){
			var that=this;
			this.mySwiper=new Swiper("#swiper-hot",{
				loop:false,
				onSlideChangeStart:function(swiper){
					//swiper是对new swiper出来的实例;
					var index=swiper.activeIndex;
					//console.log(index);
					var $lis=$("#title li");
					util.setFocus($lis.eq(index),"active");	
				}
			});

			this.mySwiper=new Swiper("#swiper-home",{
				loop:false,
				onSlideChangeStart:function(swiper){
					//swiper是对new swiper出来的实例;
					var index=swiper.activeIndex;
					var $lis=$(".m_main nav li");
					util.setFocus($lis.eq(index),"active");	
				}
			});

			// 下拉刷新--上拉加载
      		var myScroll=this.widgets.homeListScroll;
      		var scrollSize = 30;
     			myScroll.scrollBy(0,-scrollSize);
     		var head=$(".head img"),
          		topImgHasClass=head.hasClass("up");
      		var foot=$(".foot img"),
          		bottomImgHasClass=head.hasClass("down");
     			myScroll.on("scroll",function(){
        			var y=this.y,
            		maxY=this.maxScrollY-y;
            		if(y>=0){
	                 	!topImgHasClass && head.addClass("up");
	                	return "";
	            	}
		            if(maxY>=0){
		                 !bottomImgHasClass && foot.addClass("down");
		                 return "";
		            }
      			})

      			myScroll.on("scrollEnd",function(){
			        if(this.y>=-scrollSize && this.y<0){
			              myScroll.scrollTo(0,-scrollSize);
			              head.removeClass("up");
			        }else if(this.y>=0){
			            head.attr("src","/webappcourse/images/ajax-loader.gif");
			            //上拉刷新;
			            $.ajax({
			              	url:"/webappcourse/mock/refresh-livelist.json",
		                  	//url:"/api/refresh-livelist.php",
		                  	type:"get",
		                  	data:{
		                      	rtype:"refresh"
		                  	},
		                  	success:function(rs){
			                    that.livelistArr = rs.data.concat(that.livelistArr);
			                    that.vm.livelist = that.faramData(that.livelistArr);

			                    /*var newArr = that.livelistArr.concat(rs.data);
			                    that.vm.livedata = that.formatData(newArr);
			                    that.livelistArr = newArr;*/
			                    myScroll.scrollTo(0,-scrollSize);
			               		head.removeClass("up");
			                	head.attr("src","/webappcourse/images/arrow.png");
			               	},
			               	error:function(){
			               		console.log("请求失败");
			               	}

			            })
			        }

			        var maxY=this.maxScrollY-this.y;
			        var self=this;
			        if(maxY>-scrollSize && maxY<0){
			              myScroll.scrollTo(0,self.maxScrollY+scrollSize);
			              foot.removeClass("down")
			        }else if(maxY>=0){
		            	foot.attr("src","/webappcourse/images/ajax-loader.gif");
		              	// 请求加载数据
		             	$.ajax({
		                 	url:"/webappcourse/mock/more-livelist.json",
		                  	//url:"/api/more-livelist.php",
		                  	type:"get",
		                  	data:{
		                      rtype:"more"
		                  	},
		                  	success:function(rs){
		                      	that.livelistArr = that.livelistArr.concat(rs.data);
		                      	that.vm.livelist = that.faramData(that.livelistArr);

			                    /*var newArr = that.livelistArr.concat(rs.data);
			                    that.vm.livedata = that.formatData(newArr);
			                    that.livelistArr = newArr;*/

			                    myScroll.refresh();
			                    myScroll.scrollTo(0,self.y+self.maxScrollY);
			                    foot.removeClass("down");
			                    foot.attr("src","/webappcourse/images/arrow.png")
		                  	},
		                  	error:function(){
		                  		console.log("请求失败");
		                  	}
		              	})
		            }
				})
		}
	},
	bindActions:{
		"switch.tap":function(e){
			var index=$(e.el).index();
			this.mySwiper.slideTo(index);
		}
	}
})