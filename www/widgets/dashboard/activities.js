app.directive('dashboardActivities', [
  "settings",
  function(
    settings
  ) {

    return {
      templateUrl: settings.widgets + 'dashboard/activities.html',
      link: function(scope, element, attrs) {
        
      scope.name = "test activity";
          
      }
    };
  }
]);