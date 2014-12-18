/*global FlipApp*/
/*global getRandomColor*/
/*global google*/
(function () {
    "use strict";
    

    function DrawMarker(color, map) {
        this.map = map;
        this.markerColor = color;
    }
    
    /* draws a marker at the given latlong*/
    DrawMarker.prototype.newMarker = function (latlong) {
        var that = this;
        var imarker =  new google.maps.Marker({
            position: latlong,
            map: that.map,
            icon: { // can be users image but for simplicity using the default option
                path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                strokeColor: that.markerColor,
                scale: 5
            }
        });
        return imarker;
    };
    
    /* draws a path at the given latlong points a & b */
    DrawMarker.prototype.newPath = function (pointa, pointb) {

        var that = this,
            pathCoordinates = [
                new google.maps.LatLng(pointa.lat(), pointa.lng()),
                new google.maps.LatLng(pointb.lat(), pointb.lng())
            ],
            

            userPath = new google.maps.Polyline({
                path: pathCoordinates,
                geodesic: true,
                strokeColor: that.markerColor,
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

        userPath.setMap(that.map);
    };
    
    FlipApp.DrawMarker = DrawMarker;
}());