app.directive('courseCoursenav', [
  "settings",
  "Course",
  "$location",
  function(
    settings,
    Course,
    $location
  ) {
    return {
      templateUrl: settings.widgets + 'course/courseNav.html',
      link: function(scope, element, attrs) {

      	scope.hasAssignment = function(assignmentArray) 
      	{
      		if(typeof assignmentArray !== 'undefined' && assignmentArray.length > 0)
	      	{	      		
	      		scope.assignmentlist = assignmentArray;
	      		return true;
	     	}
	     	else
	     	{
	     		return false;
	     	}
      	}

      	scope.hasResource = function(rescourceArray) 
      	{
      		if(typeof rescourceArray !== 'undefined' && rescourceArray.length > 0)
	      	{	      		
	      		scope.resourcelist = rescourceArray;
	      		return true;
	     	}
	     	else
	     	{
	     		return false;
	     	}
      	}

      	scope.isActive = function(route){
      		return route === $location.path();
      	}
      	
    }
  };
}]);

