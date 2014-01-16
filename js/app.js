var numerologyApp = angular.module('numerologyApp', [
    'ngRoute',
    'numerologyControllers',
    'numerologyServices',
    'ui.bootstrap'
]);

numerologyApp.config(['$routeProvider',
                    function($routeProvider) {
                        $routeProvider.
                        when('/numerologyCalculator', {
                            templateUrl: 'partials/numerology-client-details.html',
                            controller: 'NumerologyClientInfoCtrl'
                        }).
                        when('/numerologyCalculator/results', {
                            templateUrl: 'partials/numerology-results.html',
                            controller: 'NumerologyResultsCtrl'
                        }).
                        otherwise({
                            redirectTo: '/numerologyCalculator'
                        });
                    }]);