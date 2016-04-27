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
              //console.log("i assignment.js", course[0])
             // scope.messages = scope.course.messages; //load messages               
            });  
          
          scope.userView = false;
          scope.teacherView = false;
          
        SessionService.getSession().success(function(response){
            var user = response.user.role;
            
            if ( user.toLowerCase() == 'student') {
                scope.userView = true;
                //console.log(scope.userView);
            } else {
                scope.teacherView = true;
                //console.log(scope.teacherView);
            }
        });



      }//end link
    };
  }
]);