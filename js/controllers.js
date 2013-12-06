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
                                    
                                      /*
                                      $http.get('/meanings/lifepath/' + $routeParams.lifepathNumber + '.html').success(function(data) {
                                          $scope.lifepathContent = data;
                                      });
                                      */
                                      
                                      
                                      $scope.lifepathNumber = $routeParams.lifepathNumber;
                                      $scope.lifepathURL = '/meanings/lifepath/' + $routeParams.lifepathNumber + '.html';
                                      $scope.lifepathStuff = "<strong>this is fun</strong>";
                                  }]);