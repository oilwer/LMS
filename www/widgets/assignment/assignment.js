app.directive('assignmentAssignment', [
    "settings",
    "$location",
    "$window",
    "$routeParams",
    "Course",
    "SessionService",
    "User",
  function(
    settings,
    $location,
    $window,
     $routeParams,
     Course,
    SessionService,
     User
  ) {
        
    return {
        templateUrl: settings.widgets + 'assignment/assignment.html',
        link: function(scope, element, attrs) {
          
            var url = $location.path().split(/[\s/]+/)[2];
            scope.course = "";
            Course.get({url: url, _populate:"assignments"}, function(course){ 
                scope.course = course[0];
                scope.assignments = scope.course.assignments;
            });  

            scope.userView = false;
            scope.teacherView = false;

            //set view depending on user-role
            SessionService.getSession().success(function(response){
                var user = response.user.role;
                if (user.toLowerCase() == 'student') {
                    scope.userView = true;
                } else {
                    scope.teacherView = true;
                };
            });

      }//end link
    };
  }
]);