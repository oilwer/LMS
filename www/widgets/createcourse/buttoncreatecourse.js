app.directive('createcourseButtoncreatecourse', [
    "settings",
    "$location",
    "$window",
  function(
    settings,
    $location,
    $window
  ) {

    return {
      templateUrl: settings.widgets + 'createcourse/buttoncreatecourse.html',
      link: function(scope, element, attrs) {

        
      scope.createCourse = function() {
          $window.location.href = '/create-course';
      };
          
      }
    };
  }
]);