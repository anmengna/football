//公共文件
require('./lib/spa.min');
/*require('./lib/iscroll-probe');*/
//swiper框架;
require('./lib/swiper-3.3.1.min');



//views
require('./views/index');
require('./views/guide');
require('./views/home');
require('./views/search');
require('./views/user');
require('./views/register');
require("./views/prompt");
require("./views/login");

SPA.config({
	indexView:"index"
})

console.log("hello");
