app.directive('resourcesResources', [
  "settings",
  "User",
  "$routeParams",
  function(
    settings,
    User,
    $routeParams ) {
    return {
      templateUrl: settings.widgets + 'resources/resources.html',
      link: function($scope, element, attrs) {

        console.log("hello");

      }
    };
  }
]);
