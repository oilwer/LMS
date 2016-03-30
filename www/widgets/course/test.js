app.directive('courseTest', [
  "settings",
  function(
    settings
  ) {

    return {
      templateUrl: settings.widgets + 'course/test.html',
      link: function(scope, element, attrs) {
          
      //placeholder for all the users courses, get from db
      $scope.courses = {
          name: "Web development",
          assignment: "Assignment 1",
          status: "active",
          url: "testcourse"
        };
          
        // a clock
        scope.showTime = function() {
          // shows how angular digests scope
          // only when user interacts with form
          // if done without interval (and $apply() ?)
          return new Date();
        };
      }
    };
  }
]);