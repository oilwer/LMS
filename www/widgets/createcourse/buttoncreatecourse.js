app.directive('createcourseButtoncreatecourse', [
    "settings",
    "$location",
  function(
    settings,
    $location
  ) {

    return {
      templateUrl: settings.widgets + 'createcourse/buttoncreatecourse.html',
      link: function(scope, element, attrs) {

        
      scope.createCourse = function() {
          $location.path('/create-course');
      };
          
      }
    };
  }
]);