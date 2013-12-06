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
        return $scope.clientInfo.birthMonth;
    }
});

numerologyControllers.controller('NumerologyLifepathCtrl',
                                 ['$scope', '$routeParams', '$http', 'ClientInfoStore', 
                                 
                                  function($scope, $routeParams, $http, ClientInfoStore) {
                                    
                                      $scope.lifepathNumber = $routeParams.lifepathNumber;
                                      $scope.lifepathURL = '/meanings/lifepath/' + $scope.lifepathNumber + '.html';
                                      $scope.clientInfo = ClientInfoStore.get();
                                  }]);