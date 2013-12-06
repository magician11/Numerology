var numerologyApp = angular.module('numerologyApp', [
    'ngRoute',
    'numerologyControllers',
    'numerologyServices'
]);

numerologyApp.config(['$routeProvider',
                    function($routeProvider) {
                        $routeProvider.
                        when('/numerologyCalculator', {
                            templateUrl: 'partials/numerology-client-details.html',
                            controller: 'NumerologyClientInfoCtrl'
                        }).
                        when('/numerologyCalculator/lifepath/:lifepathNumber', {
                            templateUrl: 'partials/numerology-lifepath.html',
                            controller: 'NumerologyLifepathCtrl'
                        }).
                        otherwise({
                            redirectTo: '/numerologyCalculator'
                        });
                    }]);