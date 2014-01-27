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
                                      
                                      function calcSingleNumber (d) {
                                          var d = sumDigits(d).toString();
                                          if(d.length > 1) return +calcSingleNumber(d);
                                          return +d;
                                      }
                                      
                                      function sumDigits (digits) {
                                          return digits.toString().split('').map(Number)
                                          .reduce(function (a, b) { return a + b }, 0);
                                      }
                                      
                                      /********* Life Path calculations *********/
                                      
                                      $scope.lifepathNumber = getLifePathNumber();
                                      $scope.lifepathURL = '/meanings/lifepath/' + $scope.lifepathNumber + '.html';
                                      
                                      function getLifePathNumber() {
                                          var birthDigits = $scope.clientInfo.birthDate + $scope.clientInfo.birthMonth + $scope.clientInfo.birthYear;
                                          
                                          return calcSingleNumber(birthDigits);
                                      }
                                      
                                      /********* Destiny number calculations *********/
                                      
                                      $scope.destinyNumber = getDestinyNumber();
                                      $scope.destinyURL = '/meanings/destiny/' + $scope.destinyNumber + '.html';
                                      
                                      /* given a character, find what it's associated number value is */
                                      function getDestinyValue(c) {
                                          
                                          var destinyStructure = ["AJS", "BKT", "CLU", "DMV", "ENW", "FOX", "GPY", "HQZ", "IR"];
                                          
                                          c = c.toUpperCase();
                                          
                                          for (var i = 0; i<destinyStructure.length; i++) {
                                              if (destinyStructure[i].indexOf(c) != -1) {
                                                  return i+1;
                                              }
                                          }
                                          
                                          return 0; // ignores non alphabetical characters
                                      }
                                      
                                      /* go through all the letters in the name to calculate destiny number */
                                      function getDestinyNumber() {
                                          
                                          var destinyNumber = 0;
                                          
                                          for(var i = 0; i < $scope.clientInfo.fullName.length; i++) {
                                              destinyNumber += getDestinyValue($scope.clientInfo.fullName.charAt(i));
                                          }
                                          
                                          return calcSingleNumber(destinyNumber);
                                      }
                                      
                                  }]);