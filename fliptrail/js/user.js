/*global FlipApp*/
/*global prompt*/
/*global alert*/
/*global localstore*/
(function () {
    "use strict";
    
   
    var user = {
        init: function () {
            var details = this.get(),
                name;
            
            if (typeof details === 'undefined' || details === '') {
                name = prompt('What`s Your Name');
                if (name) {
                    this.set(name);
                } else {
                    alert("No Name Entered");
                }
            } else {
                details = JSON.parse(details);
                this.id = details.id;
                this.name = details.name;
            }
        },
        get: function (key) {
            return localstore.get('user');
            
        },
        set: function (name) {
            var id = FlipApp.firebase.push('users', name),
                details;
            console.log(id);
            if (id) {
                details = {
                    id : id,
                    name: name
                };
                localstore.set('user', JSON.stringify(details));
                this.id = id;
            }
        }
    };
    
    FlipApp.user = user;
}());