/*global $ */
/*global requestAnimationFrame */
var PQueryEffect = (function () {
	
	"use strict";
	
	
	
	/*
	 * apply effect to aa element.
	 */

	var PQueryEffect = function (Nodes) {
		this.Nodelist = Nodes;
	};

	PQueryEffect.prototype.show =  function () {
		this.Nodelist.style.display = 'none';
	};

	PQueryEffect.prototype.hide =  function () {
		this.Nodelist.style.display = '';
	};
	
	PQueryEffect.prototype.fade =  function (mode, speed) {

		mode  = mode.toLowerCase().trim();
		speed = speed || 400;
		
		var opacity  = (mode === 'in') ? 0 : 1,
		    last     = +new Date(), //+ is used to convert to number
			fade_out = function (node) {
				
				opacity -= (new Date() - last) / speed;
				node.style.opacity = opacity;

				last = +new Date();

				if (opacity > 0) {
					var fade_timeout = function () {
							fade_out(node);
						};

					return ((window.requestAnimationFrame && requestAnimationFrame(fade_timeout)) ||
							setTimeout(fade_timeout, 10));
				}
			},
			fade_in = function (node) {

				opacity += (new Date() - last) / speed;
				node.style.opacity = opacity;

				last = +new Date();

				if (opacity < 1) {
					var fade_timeout = function () {
							fade_in(node);
						};

					return ((window.requestAnimationFrame && requestAnimationFrame(fade_timeout)) ||
							setTimeout(fade_timeout, 10));
				}
			};
		
		this.Nodelist[0].style.opacity = opacity;

		if (mode === 'in') {
			fade_in(this.Nodelist[0]);
		} else {
			fade_out(this.Nodelist[0]);
		}
		

	};
	
	
	
	PQueryEffect.prototype.slide =  function (mode, speed) {

		mode  = mode.toLowerCase().trim();
		speed = speed || 400;
		
		var slide_left = function (node) {
				var slide_timeout = function () {
						slide_left(node);
					};

				return ((window.requestAnimationFrame && requestAnimationFrame(slide_timeout)) ||
						setTimeout(slide_timeout, 10));
				
			},
			slide_right = function (node) {
				var slide_timeout = function () {
						slide_right(node);
					};

				return ((window.requestAnimationFrame && requestAnimationFrame(slide_timeout)) ||
						setTimeout(slide_timeout, 10));
			},
			slide_up = function (node) {
				var slide_timeout = function () {
						slide_up(node);
					};

				return ((window.requestAnimationFrame && requestAnimationFrame(slide_timeout)) ||
						setTimeout(slide_timeout, 10));
			},
			slide_down = function (node) {
				var slide_timeout = function () {
						slide_down(node);
					};

				return ((window.requestAnimationFrame && requestAnimationFrame(slide_timeout)) ||
						setTimeout(slide_timeout, 10));
			};
		
		switch (mode) {
		case 'left':
			slide_left(this.Nodelist[0]);
			break;
		case 'right':
			slide_right(this.Nodelist[0]);
			break;
		case 'up':
			slide_up(this.Nodelist[0]);
			break;
		case 'down':
			slide_down(this.Nodelist[0]);
			break;
		}
		

	};
	
	
	return PQueryEffect;
}());