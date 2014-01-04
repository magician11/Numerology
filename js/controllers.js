'use strict';

/* Controllers */

var numerologyControllers = angular.module('numerologyControllers', []);

numerologyControllers.controller('NumerologyClientInfoCtrl', function($scope, $location, ClientInfoStore) {
    $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    $scope.submitClientDetails = function() {
        
        ClientInfoStore.save($scope.clientInfo);
        $location.path("/numerologyCalculator/lifepath/" + getLifePathNumber());
    };
    
    function sumDigits (digits) {
        return digits.toString().split('').map(Number)
        .reduce(function (a, b) { return a + b }, 0);
    }
    
    function calcLifePathNumber (d) {
        var d = sumDigits(d).toString();
        // +value is a trick to coerce a value into a number
        if(d.length > 1) return +calcLifePathNumber(d);
        return +d
    }
    
    function getLifePathNumber() {
        var birthDigits = $scope.clientInfo.birthDate + $scope.clientInfo.birthMonth + $scope.clientInfo.birthYear;
        
        return calcLifePathNumber(birthDigits);
    }
});

numerologyControllers.controller('NumerologyLifepathCtrl',
                                 ['$scope', '$routeParams', '$http', 'ClientInfoStore', 
                                  
                                  function($scope, $routeParams, $http, ClientInfoStore) {
                                      
                                      $scope.lifepathNumber = $routeParams.lifepathNumber;
                                      $scope.lifepathURL = '/meanings/lifepath/' + $scope.lifepathNumber + '.html';
                                      $scope.clientInfo = ClientInfoStore.get();
                                      
                                      $scope.getDOB = function() {
                                          return $scope.clientInfo.birthYear + "-" + twoDigits($scope.clientInfo.birthMonth) + "-" + twoDigits($scope.clientInfo.birthDate);
                                      }
                                      
                                      function twoDigits(dateValue) {
                                          return (dateValue >= 10)? dateValue : '0' + dateValue;
                                      }
                                      
                                  }]);