requirejs.config({
	baseUrl: "../dev",
	paths: {
		"jquery" : 'http://code.jquery.com/jquery-1.10.1.min',
		"TweenMax": "http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min",
		"smooth_mousewheel": "../demo/js/smooth_mousewheel",
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
			 Parallax.update(e.scrollTop);
		});

		SmoothMousewheel.enable();
	});
});