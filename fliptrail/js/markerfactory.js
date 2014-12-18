/*global FlipApp*/
(function () {
    "use strict";
    

    var markerFactory = {
        markers: {},
        addMarker: function (userID, latlong) {
            if (this.markers[userID] !== undefined) {
                this.markers[userID].placeMarker(latlong);
            } else {
                this.markers[userID] = new FlipApp.UserMarkers(userID, FlipApp.gMap.map);
                this.markers[userID].placeMarker(latlong);
            }
        }
    };
    
    FlipApp.markerFactory = markerFactory;
}());