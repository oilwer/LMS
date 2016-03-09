// public/js/app.js

var lmsApp = angular.module('lmsApp', ['ngLocationUpdate', 'ngRoute', 'appRoutes',
    'LoginCtrl', 'HomeCtrl', 'ProfileCtrl', 'ChatCtrl', 'UserCtrl', 'ProfilePublicCtrl',
'ProfileService', 'LoginService', 'UserService', 'ChatService', 'ProfilePublicService']);


//Directives
//Navigation directive
lmsApp.directive('appNav', function(){
    return{
        restrict: 'E',
        templateUrl: 'js/directives/nav.html'
    };
});

