###这个lib使用AMD方式加载，基于Jquery,TweenMax开发。

Demo: <http://www.xzfblog.com/demo/smooth-mousewheel/demo/index.html>

	requirejs.config({
		baseUrl: "../dev",
		paths: {
			"jquery" : 'http://code.jquery.com/jquery-1.10.1.min',
			"TweenMax": "http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min",
			"smooth_mousewheel": "smooth_mousewheel",
			"parallax": "parallax"
		},
		shim: {
		    "smooth_mousewheel" : ["jquery"],
		    "parallax" : ["jquery"]
		}
	});

	require(['jquery', "smooth_mousewheel", "parallax"], function($, SmoothMousewheel, Parallax) {
		$(function (){
			Parallax.init($("section"));
			$(window).on("SmoothScroll", function (e){
				 console.log(e.scrollTop);
				 Parallax.update(e.scrollTop);
			});
	
			SmoothMousewheel.enable();
		});
	});


####API:
