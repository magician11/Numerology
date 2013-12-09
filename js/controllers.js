'use strict';

/* Controllers */

var numerologyControllers = angular.module('numerologyControllers', []);

numerologyControllers.controller('NumerologyClientInfoCtrl', function($scope, $location, ClientInfoStore) {
    $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    $scope.submitClientDetails = function() {
        
        ClientInfoStore.save($scope.clientInfo);
        $location.path("/numerologyCalculator/lifepath/" + calcLifePathNumber());
    };
    
    function calcLifePathNumber() {
        var birthDigits = $scope.clientInfo.birthDate + $scope.clientInfo.birthMonth + $scope.clientInfo.birthYear;
        
        var lifepathNumber = 0, digitsArray = [];
        
        
        // add all the digits until the sum is <= 9
        do {
            digitsArray = birthDigits.split('');
            lifepathNumber = eval(digitsArray.join('+'));
            birthDigits = lifepathNumber.toString();
        } while(lifepathNumber == 0 || lifepathNumber > 9)
        
        return lifepathNumber;
    }
});

numerologyControllers.controller('NumerologyLifepathCtrl',
                                 ['$scope', '$routeParams', '$http', 'ClientInfoStore', 
                                 
                                  function($scope, $routeParams, $http, ClientInfoStore) {
                                    
                                      $scope.lifepathNumber = $routeParams.lifepathNumber;
                                      $scope.lifepathURL = '/meanings/lifepath/' + $scope.lifepathNumber + '.html';
                                      $scope.clientInfo = ClientInfoStore.get();
                                  }]);