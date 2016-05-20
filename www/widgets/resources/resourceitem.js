app.directive('resourcesResourceitem', [
  "settings",
  "$routeParams",
  "Course",
  "Resource",
  function(
    settings,
    $routeParams,
    Course,
    Resource
  ) {

    return {
      templateUrl: settings.widgets + 'resources/resourceitem.html',
      link: function(scope, element, attrs) {

      }
    };
  }
]);
