/*global FlipApp*/
/*global Firebase*/
/*global google*/
(function () {
    "use strict";
    
    
    var firebase = {
        init: function () {
            var dbh = new Firebase('https://luminous-inferno-2815.firebaseio.com/'); /* for databse connection handeling */
            this.db = {
                points : dbh.child("points"),
                users : dbh.child("users")
            };
        },
        liveGet: function (key, callback) { /* returns every time a element is added into collection */
            this.db[key].on('child_added', callback);
        },
        push: function (key, value) { /* insert into the collection */
            var result =  this.db[key].push(value);
            return result.key();
        }
    };
    
    FlipApp.firebase = firebase;
}());