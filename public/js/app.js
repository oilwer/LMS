// public/js/app.js

var lmsApp = angular.module('lmsApp', ['ngLocationUpdate', 'ngRoute', 'appRoutes',
    'LoginCtrl', 'HomeCtrl', 'CoursesCtrl', 'ProfileCtrl', 'ChatCtrl', 'UserCtrl', 'ProfilePublicCtrl', 'ModelAnythingCtrl', 'TestplugCtrl',
'ProfileService', 'LoginService', 'UserService', 'ModelAnythingService', 'ChatService', 'ProfilePublicService']);


//Directives
//Navigation directive
lmsApp.directive('appNav', function(){
    return{
        restrict: 'E',
        templateUrl: 'js/directives/nav.html'
    };
});

// Dashboard directive (renders the dashboard w/ plugins)
lmsApp.directive('dynamic', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.dynamic, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
});

