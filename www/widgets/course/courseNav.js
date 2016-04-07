app.directive('courseCoursenav', [
  "settings",
  "Course",
  "$location",
  "Assignment",
  function(
    settings,
    Course,
    $location,
    Assignment
  ) {
    return {
      templateUrl: settings.widgets + 'course/courseNav.html',
      link: function(scope, element, attrs) {

        scope.course = "";
        Assignment.get({course:  scope.course._id}, function(res){
            scope.assignmentlist = res;
        }); 

        scope.resourcelist =  scope.course.resources;

      	scope.hasAssignment = function(assignments) 
      	{
      		  if(typeof assignments !== 'undefined' && assignments.length > 0)
            {
              return true;
            }
            else{ return false; }            
      	}

      	scope.hasResource = function(rescourceArray) 
      	{
      		if(typeof rescourceArray !== 'undefined' && rescourceArray.length > 0)
	      	{	      		
	      		return true;
  	     	}
  	     	else { return false; }
      	}

      	scope.isActive = function(route){
      		return route === $location.path();
      	}
      	
    }
  };
}]);

