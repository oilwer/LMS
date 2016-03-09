// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        
        // dashboard
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
    
        // courses
        .when('/courses', {
            templateUrl: 'views/courses.html',
            controller: 'CoursesController'
        })
    
        // courses
        .when('/courses/testcourse', {
            templateUrl: 'views/testcourse.html',
            controller: 'TestCourseController'
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
        //dynamic url (listen on whats in the :url)
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