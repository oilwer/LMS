app.directive('courseListadded', [
  "settings",
  "$location",
  "SessionService",
  "User",
  "Course",
  "Assignment",
  "Resource",
  function(
    settings,
    $location,
    SessionService,
    User,
    Course,
    Resource,
    Assignment
  ) {
    return {
      templateUrl: settings.widgets + 'course/listadded.html',
      link: function(scope, element, attrs) {

   
      } //link
    }
  }
]);
