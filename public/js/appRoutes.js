// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        
        // Login
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        
        // Profile
        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileController'
        })
        
        // Chat
        .when('/chat', {
            templateUrl: 'views/chat.html',
            controller: 'ChatController'
        })

        // Public profile
        //dynamic url (listen on whats in the URL)
        .when('/public/:url', {
            templateUrl: 'views/profilePublic.html',
            controller: 'ProfilePublicController'
        })
        
        // User management page
        .when('/user', {
            templateUrl: 'views/user.html',
            controller: 'UserController'
        });

    $locationProvider.html5Mode(true);

}]);