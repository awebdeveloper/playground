/*global $ */
var PQueryAttr = (function () {
	
	"use strict";
	/*
	 * get or set any attribute of a element.
	 */

	var PQueryAttr = function (Nodes) {
		this.Nodelist = Nodes;
	};

	PQueryAttr.prototype.set =  function (attrib, value) {
		if (typeof attrib !== 'object') {
			attrib[attrib] = value;
		}

		this.Nodelist.each(function () {
			var i;
			for (i = 0; i < attrib.length; i += 1) {
				this.setAttribute(i, attrib[i]);
			}
		});
		
		return this.Nodelist.returnNode(this);
	};

	PQueryAttr.prototype.get =  function (attrib) {
		return this.Nodelist[0].getAttribute(attrib);
	};
	
	return PQueryAttr;

}());