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
          console.log(url);
          Course.get({url: url, _populate:"assignments"}, function(course){ 
              scope.course = course[0];
              scope.assignments = scope.course.assignments;
             // scope.messages = scope.course.messages; //load messages               
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