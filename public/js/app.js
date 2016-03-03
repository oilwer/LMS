// public/js/app.js
var lmsApp = angular.module('lmsApp', ['ngLocationUpdate', 'ngRoute', 'appRoutes', 'LoginCtrl', 'ProfileCtrl', 'ChatCtrl', 'UserCtrl', 
'ProfileService', 'LoginService', 'UserService', 'ChatService']);



lmsApp.directive('appNav', function(){
    return{
        restrict: 'E',
        templateUrl: 'js/directives/nav.html'
    };
});