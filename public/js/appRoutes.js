// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/nerds', {
            templateUrl: 'views/nerd.html',
            controller: 'NerdController'
        })
        
        // Add login page
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        
        // Add login page
        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileController'
        });

    $locationProvider.html5Mode(true);

}]);