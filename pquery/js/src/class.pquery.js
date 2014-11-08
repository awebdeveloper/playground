/*global $ */
var PQueryClass = (function () {
	
	"use strict";
	/*
	 * get or set width of a element.
	 * global $
	 */

	var PQueryClass = function (Nodes) {
		this.Nodelist = Nodes;
	};

	PQueryClass.prototype.set =  function (value) {
		this.Nodelist.each(function () {
			this.className += ' ' + value;
		});
		
		return this.Nodelist.returnNode(this);
	};

	PQueryClass.prototype.get =  function () {
		return this.Nodelist[0].className;
	};

	PQueryClass.prototype.del =  function (cls) {
		var Nodelist = this.Nodelist,
			regexp   = new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi');

		Nodelist.each(function (i) {
			this.className = this.className.replace(regexp, ' ');
		});

		return this.Nodelist.returnNode(this);
	};

	PQueryClass.prototype.has =  function (cls) {
		return (' ' + this.Nodelist[0].className + ' ').indexOf(' ' + cls + ' ') > -1;
	};

	PQueryClass.prototype.toggle =  function (cls) {
		var class_list = cls.split(' '),
			Nodelist   = this.Nodelist;

		Nodelist.each(function (i) {
			var j;
			for (j = 0; j < class_list.length; j += 1) {
				if ((' ' + Nodelist[i].className + ' ').indexOf(' ' + class_list[j] + ' ') > -1) {
					$(this).classes().del(class_list[j]);
				} else {
					$(this).classes().set(class_list[j]);
				}
			}
		});
		
		return this.Nodelist.returnNode(this);
	};
	
	return PQueryClass;
	
}());

