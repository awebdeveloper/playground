
/* currently returns random color but could be updated to get map safe colors*/
function getRandomColor() {
    "use strict";
    var color = Math.floor(Math.random() * 16777216).toString(16);
    return '#000000'.slice(0, -color.length) + color;
}