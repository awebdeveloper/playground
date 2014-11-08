var PQueryHtml = (function () {
	
	"use strict";
	/*
	 * get or set html of a element.
	 */

	var PQueryHtml = function (Nodes) {
		this.Nodelist = Nodes;
	};

	PQueryHtml.prototype.set =  function (value, mode) {
		
		var supported_mode	= ['default', 'append', 'prepend', 'replace', 'before', 'after'];
		
		mode = mode || 'default';
		mode = mode.toLowerCase().trim();
		
		
		
		/*Throw error if not a supported mode*/
		if (supported_mode.indexOf(mode) === -1) {
			throw "Invalid Mode";
		}
		
		this.Nodelist.each(function () {

			if (mode === 'default') {
				this.innerHTML = value;

			} else if (mode === 'append') {
				this.innerHTML = this.innerHTML + value;

			} else if (mode === 'prepend') {
				this.innerHTML = value + this.innerHTML;

			} else if (mode === 'before') {
				this.insertAdjacentHTML('beforebegin', value);

			} else if (mode === 'after') {
				this.insertAdjacentHTML('afterend', value);

			} else if (mode === 'replace') {
				this.outerHTML = value;

			}

		});

		
	};

	PQueryHtml.prototype.get =  function (mode) {

		var supported_mode	= ['innerHTML', 'outerHTML', 'parent', 'children'],
			wrap,
			children = [],
			i,
			el = this.Nodelist[0];
		
		mode = mode || 'innerHTML';
		mode = mode.toLowerCase().trim();
		
		/*Throw error if not a supported dimention*/
		if (supported_mode.indexOf(mode) === -1) {
			throw "Invalid Dimention";
		}
		
		if (mode === 'innerHTML') {
			return el.innerHTML;

		} else if (mode === 'outerHTML') {
			wrap = document.createElement('div');
			wrap.appendChild(el.cloneNode(true));
			return wrap.innerHTML;
	
		} else if (mode === 'parent') {
			return el.parentNode;
	
		} else if (mode === 'children') {
			for (i = el.children.length; i > 0; i -= 1) {
				// Skip comment nodes on IE8
				if (el.children[i].nodeType !== 8) {
					children.unshift(el.children[i]);
				}
			}
	
		}

	};
	
	PQueryHtml.prototype.del =  function (mode) {
		var supported_mode	= ['innerHTML', 'outerHTML'],
			wrap;
		
		mode = mode || 'outerHTML';
		mode = mode.toLowerCase().trim();
		
		/*Throw error if not a supported dimention*/
		if (supported_mode.indexOf(mode) === -1) {
			throw "Invalid Dimention";
		}
		
		
		if (mode === 'outerHTML') {
			this.Nodelist[0].parentNode.removeChild(this.Nodelist[0]);

		} else if (mode === 'innerHTML') {
			while (this.Nodelist[0].firstChild) {
				this.Nodelist[0].removeChild(this.Nodelist[0].firstChild);
			}
		}
		
		return this.Nodelist.returnNode(this);
	};
	
	PQueryHtml.prototype.clone =  function () {
		return this.Nodelist[0].cloneNode(true);
	};
	
	return PQueryHtml;
	
}());