/*global $ */
var PQueryDimention = (function () {
	
	"use strict";
	/*
	 * get or set height of a element.
	 */

	var PQueryDimention = function (Nodes) {
		this.Nodelist = Nodes;
	};

	PQueryDimention.prototype.set =  function (attr, value) {

		var supported_dimention = ['width', 'height'],
			unit                = isNaN(value.slice(2)) ? '' : 'px'; /*If last two chars are not number then unit exists*/

		attr = attr.toLowerCase().trim();
		
		/*Throw error if not a supported dimention*/
		if (supported_dimention.indexOf(attr) === -1) {
			throw "Invalid Dimention";
		}

		this.Nodelist.each(function () {
			this.style[attr] = value + 'px';
		});

		return this.Nodelist.returnNode(this);
	};

	PQueryDimention.prototype.get =  function (attr) {
		var Nodelist	= this.Nodelist,
			dimentions	= {
				'width'			: Nodelist[0].clientWidth,
				'height'		: Nodelist[0].clientHeight,
				'outer_width'	: Nodelist[0].clientWidth,
				'outer_height'	: Nodelist[0].clientWidth
			};
		
		attr = attr.toLowerCase().trim();
		
		/*Return everything in case of all*/
		if (attr === 'all') {
			return dimentions;
		}
		
		/*Throw error if not a supported dimention*/
		if (typeof dimentions[attr] === 'undefined') {
			//throw error
			throw "Invalid Dimention";
		}
		
		/*return dimention*/
		return dimentions[attr];
	};
	
	return PQueryDimention;
	
}());