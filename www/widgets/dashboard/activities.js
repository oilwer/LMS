app.directive('dashboardActivities', [
    "settings",
    "$location",
    "$window",
    "SessionService",
  function(
    settings,
    $location,
    $window,
    SessionService
  ) {

    return {
      templateUrl: settings.widgets + 'dashboard/activities.html',
      link: function(scope, element, attrs) {
        SessionService.getSession().success(function(response){
          if(response.user.role == "admin" || response.user.role == "teacher"){
            scope.buttonDisplay = true;
          }
        });
      }
    };
  }
]);