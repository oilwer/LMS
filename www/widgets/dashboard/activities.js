app.directive('dashboardActivities', [
    "settings",
    "$location",
    "$window",
  function(
    settings,
    $location,
    $window
  ) {

    return {
      templateUrl: settings.widgets + 'dashboard/activities.html',
      link: function(scope, element, attrs) {
        
          
      }
    };
  }
]);