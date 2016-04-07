app.directive('assignmentAssignment', [
  "settings",
  "Assignment",
  "$routeParams",
  function(
    settings,
    Assignment,
    $routeParams
  ) {
	  
    return {
      templateUrl: settings.widgets + 'assignment/assignment.html',
      link: function(scope, element, attrs) {
	  		
          var assignmentId = $routeParams.id;
          Assignment.getById(assignmentId, function(res){
             scope.assignment = res;
              if (scope.assignment.obligatory === true) {
                  scope.assignment.obligatory = "Yes";
              }
                else{
                      scope.assignment.obligatory = "No";
                    
              };
          });
          
      }
    };
  }
]);