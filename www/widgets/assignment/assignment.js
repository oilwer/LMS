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
          Course.get({url: $routeParams.url}, function(course){
            scope.course = course[0];

          });  
          
          
          scope.userView = false;
          scope.teacherView = false;
          
        SessionService.getSession().success(function(response){
            var user = response.user.role;
            console.log(user);
            
            if ( user.toLowerCase() == 'user') {
                console.log("student igen");
                scope.userView = true;
                console.log(scope.userView);
            } else {
                console.log('teacher igen');
                console.log(scope.teacherView);
                scope.teacherView = true;
                console.log(scope.teacherView);
            }
        });



      }//end link
    };
  }
]);