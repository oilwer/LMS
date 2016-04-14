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

        var c = Course.get({_id:scope.course._id,_populate:"assignments"});
        scope.assignments = c.assignments;
          console.log(c);

        scope.resourcelist =  scope.course.resources;

      	scope.hasAssignment = function(assignments) 
      	{
      		  return (typeof assignments !== 'undefined' && assignments.length > 0);          
      	}

      	scope.hasResource = function(rescourceArray) 
      	{
      		return (typeof rescourceArray !== 'undefined' && rescourceArray.length > 0);
      	}

      	scope.isActive = function(route){
      		return route === $location.path();
      	}
      	
    }
  };
}]);

