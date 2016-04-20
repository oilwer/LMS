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
			        	console.log(user[0]);
			        	
			        	scope.courses = user[0].courses;
						console.log(scope.courses);
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
        scope.$on('addedCourse', function() {
          refresh();
        });                 
      }
    };
  }
]);