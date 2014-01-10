'use strict';

/* Controllers */

var numerologyControllers = angular.module('numerologyControllers', []);

numerologyControllers.controller('NumerologyClientInfoCtrl', function($scope, $location, ClientInfoStore) {
    $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.clientInfo = {
        birthYear: 1980
    };
    
    $scope.submitClientDetails = function() {
        
        ClientInfoStore.save($scope.clientInfo);
        $location.path("/numerologyCalculator/results/");
    };
});

numerologyControllers.controller('NumerologyResultsCtrl',
                                 ['$scope', '$routeParams', '$http', 'ClientInfoStore', 
                                  
                                  function($scope, $routeParams, $http, ClientInfoStore) {
                                      
                                      $scope.clientInfo = ClientInfoStore.get();
                                      
                                      /********* Helper functions for displaying client info *********/
                                      
                                      $scope.getDOB = function() {
                                          return $scope.clientInfo.birthYear + "-" + twoDigits($scope.clientInfo.birthMonth) + "-" + twoDigits($scope.clientInfo.birthDate);
                                      }
                                      
                                      function twoDigits(dateValue) {
                                          return (dateValue >= 10)? dateValue : '0' + dateValue;
                                      }
                                      
                                      /********* Life Path calculations *********/
                                      
                                      $scope.lifepathNumber = getLifePathNumber();
                                      $scope.lifepathURL = '/meanings/lifepath/' + $scope.lifepathNumber + '.html';
                                      
                                      function getLifePathNumber() {
                                          var birthDigits = $scope.clientInfo.birthDate + $scope.clientInfo.birthMonth + $scope.clientInfo.birthYear;
                                          
                                          return calcLifePathNumber(birthDigits);
                                      }
                                      
                                      function calcLifePathNumber (d) {
                                          var d = sumDigits(d).toString();
                                          if(d.length > 1) return +calcLifePathNumber(d);
                                          return +d
                                      }
                                      
                                      function sumDigits (digits) {
                                          return digits.toString().split('').map(Number)
                                          .reduce(function (a, b) { return a + b }, 0);
                                      }
                                      
                                      /********* Expression number calculations *********/
                                      
                                      $scope.expressionNumber = getExpressionNumber();
                                      $scope.expressionURL = '/meanings/expression/' + $scope.expressionNumber + '.html';
                                      
                                      function getExpressionNumber() {
                                          
                                          return 1;
                                      }
                                      
                                  }]);