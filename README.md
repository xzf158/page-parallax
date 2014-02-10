###这个lib使用AMD方式加载，基于Jquery,TweenMax开发。

Demo: <http://www.xzfblog.com/demo/smooth-mousewheel/demo/index.html>

config 文件：

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
			Parallax.addTo($(".left-box"), "section-1", [{stone: 0.5, duration:0.4 , vars: { x: '+=100' ,y: '+=400'}}]);
			Parallax.addTo($(".right-box"), "section-1", [{stone: 0.5, duration:0.4 , vars: { x: '-=100' ,y: '+=400'}}]);
			$(window).on("SmoothScroll", function (e){
				 console.log(e.scrollTop);
				 Parallax.update(e.scrollTop);
			});
	
			SmoothMousewheel.enable();
		});
	});


####API:
######Parallax.init($elems);
> 要加视差的单元，如: $("selction");

######Parallax.update(top);
> Current scroll top

######Parallax.addTo($el, timeline, parallaxArr);
> 手动添加, $el：添加对象，timeline：对应单元的id名，parallaxArr：视差参数

#####parallaxArr 视差参数说明
Demo：{stone: 0.5, duration:0.4 , vars: { x: '+=100' ,y: '+=400'}}]
> stone: 开始的时间点，（0-1之间）
> duration:  动画时间间隔，（0-1之间与stone相加不能大于1）
> vars: TweenMax 动画参数

#####注意：
第一个section stone的区间0.5-1
最后一个section stone的区间0-0.5







