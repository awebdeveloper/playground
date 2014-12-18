/*global google */
/*global FlipApp */
(function () {
    "use strict";
    var gMap = {
        mapOptions : {
            zoom: 3,
            center: new google.maps.LatLng(0, -180),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        init : function (MapDomID) {
            var that = this;
            that.map = new google.maps.Map(document.getElementById(MapDomID), this.mapOptions);
            google.maps.event.addListener(that.map, 'click', function (event) {
                that.createMarker(event.latLng);
            });
        },
        moveTo : function (latLong) {
            this.map.setCenter(new google.maps.LatLng(latLong.lat, latLong.lng));
        },
        createMarker: function (latlong) {
            FlipApp.firebase.push('points', {
                userID: FlipApp.user.id,
                lat: latlong.lat(),
                lng: latlong.lng()
            });
        }
    };

    
    FlipApp.gMap = gMap;

    
}());