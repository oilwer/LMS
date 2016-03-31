app.directive('dashboardCourses', [
  "settings",
  "$location",
  "Course",
  function(
    settings,
    $location,
    Course
  ) {
    return {
      templateUrl: settings.widgets + 'dashboard/mycourses.html',
      link: function(scope, element, attrs) {
      scope.heading = "My courses";
     
        var refresh = function(){
           scope.courses = Course.get(); //get all courses from database, put in scope courselist
           console.log(scope.courses);
        };
              //Runs on page update
        refresh();
      
        scope.class = "assignClass"

        scope.courseLocation = function(obj) {
            //console.log(obj.currentTarget.attributes.dataLocation.value);
                  // Redirects to cource url saved in the clicked elements dataLocation attr
            $location.path("courses/" + obj.currentTarget.attributes.dataLocation.value);
        };          
      }
    };
  }
]);