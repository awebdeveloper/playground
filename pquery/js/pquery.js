/*global PQueryDimention */
/*global PQueryAttr */
/*global PQueryClass */
/*global PQueryHtml */
/*global PQueryStyle */
/*global PQueryEffect */
(function () {
	"use strict";

	// Custom Node List
	var MyNodeList = function (selector) {
			if (typeof selector === 'string') {
				var	query = document.querySelectorAll(selector),
					i;

				this.length = query.length;
				for (i = 0; i < this.length; i += 1) {
					this[i] = query[i];
				}

			} else {
				this.length = 1;
				this[0] = selector;
			}
			return this;
		},

		// Holds all functions to be executed on DOM ready
		readyFn = [],

		// Executed on DOMContentLoaded
		DOMReady = function () {
			var i,
				l;
			for (i = 0, l = readyFn.length; i < l; i += 1) {
				readyFn[i]();
			}

			// free some mem
			readyFn = null;
			document.removeEventListener('DOMContentLoaded', DOMReady, false);
		},

		// Define the core element
		$ = function (selector) {
			return new MyNodeList(selector);
		};

	// Used to execute functions on DOM ready
	$.ready = function (fn) {
		if (readyFn.length === 0) {
			document.addEventListener('DOMContentLoaded', DOMReady, false);
		}

		readyFn.push(fn);
	};

	/*
	 * Execute code for each element in the Node List.
	 */

	MyNodeList.prototype.each = function (callback) {
			//console.log(this);
		var i;
		for (i = 0; i < this.length; i += 1) {
			callback.call(this[i], i);
		}
		return this;
	};


	/*
	 * get a  specfic element in case of multiple.
	 */
	MyNodeList.prototype.item = function (num) {
		return $(this[num]);
	};
	
	/*
	 * to allow chaining of setters of same function type via and.
	 */
	MyNodeList.prototype.returnNode = function (sub_func) {
		this.and = sub_func;
		return this;
	};


	if (typeof PQueryDimention !== "undefined") {
		MyNodeList.prototype.dimention = function () {
			return new PQueryDimention(this);
		};
	}


	if (typeof PQueryHtml !== "undefined") {
		MyNodeList.prototype.html = function () {
			return new PQueryHtml(this);
		};
	}


	if (typeof PQueryStyle !== "undefined") {
		MyNodeList.prototype.style = function () {
			return new PQueryStyle(this);
		};
	}


	if (typeof PQueryAttr !== "undefined") {
		MyNodeList.prototype.attr = function () {
			return new PQueryAttr(this);
		};
	}


	if (typeof PQueryClass !== undefined) {
		MyNodeList.prototype.classes = function () {
			return new PQueryClass(this);
		};
	}
	
	if (typeof PQueryEffect !== undefined) {
		MyNodeList.prototype.effect = function () {
			return new PQueryEffect(this);
		};
	}


	// Expose $ to the world
	window.$ = $;


}());	// Execute our namespace