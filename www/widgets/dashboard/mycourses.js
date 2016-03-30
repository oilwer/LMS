app.directive('dashboardCourses', [
  "settings",
  function(
    settings
  ) {

    return {
      templateUrl: settings.widgets + 'dashboard/mycourses.html',
      link: function(scope, element, attrs) {
        
      scope.test = "test courses";
          
      }
    };
  }
]);