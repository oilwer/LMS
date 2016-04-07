app.directive('assignmentAssignment', [
  "settings",
  "Assignment",
  "$routeParams",
  "Course",
  function(
    settings,
    Assignment,
    $routeParams,
    Course
  ) {
	  
    return {
      templateUrl: settings.widgets + 'assignment/assignment.html',
      link: function(scope, element, attrs) {

          Course.get({name: $routeParams.name}, function(course){
            scope.course = course[0];

          });          

          Assignment.get({_id: $routeParams.id}, function(assignment){
             scope.assignment = assignment[0];
              if (scope.assignment.obligatory === true) {
                  scope.assignment.obligatory = "Yes";
              }
                else{
                      scope.assignment.obligatory = "No";
                }
   
          });
          
      }
    };
  }
]);