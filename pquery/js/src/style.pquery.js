/*global $ */
var PQueryStyle = (function () {
	
	"use strict";
	/*
	 * get or set any css style property of a element.
	 */

	var PQueryStyle = function (Nodes) {
		this.Nodelist = Nodes;
	};

	PQueryStyle.prototype.set =  function (attrib, value) {

		var styleList = {};
		if (typeof attrib !== 'object') {
			styleList[attrib] = value;
		} else {
			styleList = attrib;
		}

		this.Nodelist.each(function () {
			var attr;
			for (attr in styleList) {
				if (styleList.hasOwnProperty(attr)) {
					this.style[attr] = styleList[attr];
				}
			}
		});
		
		return this.Nodelist.returnNode(this);
	};

	PQueryStyle.prototype.get =  function (attrib) {
		return window.getComputedStyle(this.Nodelist[0], null).getPropertyValue(attrib);
	};
	
	
	return PQueryStyle;
}());