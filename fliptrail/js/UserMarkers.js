/*global FlipApp*/
/*global getRandomColor*/
/*global google*/
(function () {
    "use strict";
    
    /* Stores all the markers a user has */
    function UserMarkers(userID, map) {
        this.userID = userID;
        this.map = map;
        this.markerColor = getRandomColor();
        this.markers = [];
        this.totalMarkers = 0;
        this.currentMarker = null;
        this.drawMarker = new FlipApp.DrawMarker(this.markerColor, this.map);
    }
    
    /* decide weather to add a marker or move existing once */
    UserMarkers.prototype.placeMarker = function (latlong) {
        this.markers.push(latlong);
        this.totalMarkers += 1;
        
        if (this.currentMarker === null) {
            this.addMarker(latlong);
        } else {
            this.moveMarker(latlong);
        }
    };
    
    /* no marker exists so add a marker */
    UserMarkers.prototype.addMarker = function (latlong) {
        var that = this;
        that.currentMarker = this.drawMarker.newMarker(latlong);
    };
    
    
    /* move current marker to new position */
    UserMarkers.prototype.moveMarker = function (latlong) {
        var pointa = this.markers[this.totalMarkers - 1],
            pointb = this.markers[this.totalMarkers - 2];
        
        this.drawMarker.newPath(pointa, pointb);
        this.currentMarker.setPosition(latlong);
        
    };
    
    FlipApp.UserMarkers = UserMarkers;
}());