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

          Assignment.getById($routeParams.id, function(assignment){
             scope.assignment = assignment;
          });
          
      }
    };
  }
]);