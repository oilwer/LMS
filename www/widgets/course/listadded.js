app.directive('courseListadded', [
  "settings",
  "$location",
  "SessionService",
  "User",
  "Course",
  function(
    settings,
    $location,
    SessionService,
    User,
    Course
  ) {
    return {
      templateUrl: settings.widgets + 'course/listadded.html',
      link: function(scope, element, attrs) {
      scope.heading = "My courses";

      var refresh = function(){
        scope.courses = Course.get();
      };
            //Runs on page update
      refresh();





        scope.class = "assignClass"
        scope.$root.$on('addedCourse', function() {
          refresh();
        });
      }
    };
  }
]);
