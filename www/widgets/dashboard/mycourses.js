app.directive('dashboardCourses', [
  "settings",
  "$location",
  "Course",
  "SessionService",
  "User",
  function(
    settings,
    $location,
    Course,
    SessionService,
    User
  ) {
    return {
      templateUrl: settings.widgets + 'dashboard/mycourses.html',
      link: function(scope, element, attrs) {
      scope.heading = "My courses";

        var refresh = function(){

	        SessionService.getSession().success(function(response) {


		        	User.get({_id: response.user._id, _populate:"courses"}, function(user)
		        	{
                if(user[0].courses[0] != undefined){
                  console.log(user[0].courses[0]);
                  user[0].courses[0].start = new Date(user[0].courses[0].start);
                  user[0].courses[0].end = new Date(user[0].courses[0].end);
  			        	scope.courses = user[0].courses;
                }
		        	});
		        });
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
          console.log("I hear you");
          refresh();
        });
      }
    };
  }
]);
