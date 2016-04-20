app.directive('dashboardAllcourses', [
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
      scope.heading = "All courses";
     
        var refresh = function(){		   
	        	scope.courses = Course.get();
        };
              //Runs on page update
        refresh();
      
        scope.class = "assignClass"

        scope.courseLocation = function(obj) {
            //console.log(obj.currentTarget.attributes.dataLocation.value);
                  // Redirects to cource url saved in the clicked elements dataLocation attr
            $location.path("courses/" + obj.currentTarget.attributes.dataLocation.value);
        };
        scope.$root.$on('addedCourse', function() {
          refresh();
        });                 
      }
    };
  }
]);