(function () {
    "use strict";
    
    /* local storage used to enable longterm storage 
     * could fall back or use cookies but for this demo only local storage is used    
    */
    var localstore = {
        init: function () {
            //localStorage initalisation or falback code could be added here
        },
        get: function (key) {
            return localStorage[key];
            
        },
        set: function (key, value) {
            localStorage.setItem(key, value);
        }
    };
    
    window.localstore = localstore;
}());