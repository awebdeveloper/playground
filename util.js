function createNode(htmlStr) {
	var frag = document.createDocumentFragment(),
		temp = document.createElement('div');
	temp.innerHTML = htmlStr;
	while (temp.firstChild) {
		frag.appendChild(temp.firstChild);
	}
	return frag;
}

function getRandomInt(min, max) {
	var result = Math.floor(Math.random() * (max - min + 1)) + min;
	return result;
}

function getSupportedPropertyName(property) {
	var prefix = ['moz','o','webkit','ms','khtml'];

	if (typeof document.body.style[property] != "undefined") {
		return property;
	}

	for (var i = 0; i < prefix.length; i++) {
		var propertyName = prefix[i] + property.charAt(0).toUpperCase() + property.slice(1);
		if (typeof document.body.style[propertyName] != "undefined") {
			return propertyName;
		}
	}
	return null;
}