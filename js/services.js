var numerologyServices = angular.module('numerologyServices', []);

numerologyServices.factory('ClientInfoStore', function () {
    
    var clientData;
    
    return { 
        save: function(clientInfo) {
            clientData = clientInfo;
        }, 
        get: function() {
            // return the client info
            return clientData;
        }
    };
});