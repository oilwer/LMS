app.directive('assignmentItem', [
  "settings",
  "$routeParams",
  "Assignment",
    "$location",
  function(
    settings,
    Assignment,
    $routeParams,
     $location
  ) {
    
    return {
      templateUrl: settings.widgets + 'assignment/item.html',
      link: function(scope, element, attrs) {
                
          scope.locationPath = function(newPath) {
              $location.path(newPath);
          }

      } //link
    };
  }
]);
