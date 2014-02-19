/*jslint browser: true*/
function createNode(htmlStr) {
    "use strict";
	var frag = document.createDocumentFragment(),
		temp = document.createElement('div');
	temp.innerHTML = htmlStr;
	while (temp.firstChild) {
		frag.appendChild(temp.firstChild);
	}
	return frag;
}

function getRandomInt(min, max) {
    "use strict";
	var result = Math.floor(Math.random() * (max - min + 1)) + min;
	return result;
}

function getSupportedStyleName(property) {
    "use strict";
	var prefix = ['moz', 'o', 'webkit', 'ms', 'khtml'],
        i,
        propertyName;

	if (typeof document.body.style[property] !== "undefined") {
		return property;
	}

	for (i = 0; i < prefix.length; i += 1) {
		propertyName = prefix[i] + property.charAt(0).toUpperCase() + property.slice(1);
		if (typeof document.body.style[propertyName] !== "undefined") {
			return propertyName;
		}
	}
	return null;
}

(function () {
    "use strict";
    var lastTime    = 0,
        prefix     = ['moz', 'o', 'webkit', 'ms', 'khtml'],
        i;
    for (i = 0; i < prefix.length && !window.requestAnimationFrame; i += 1) {
        window.requestAnimationFrame = window[prefix[i] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame  = window[prefix[i] + 'CancelAnimationFrame']
                                    || window[prefix[i] + 'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime    = new Date().getTime(),
                timeToCall  = Math.max(0, 16 - (currTime - lastTime)),
                id;
            
            id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            
            lastTime = currTime + timeToCall;
            return id;
        };
    }
 
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}());