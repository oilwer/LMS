app.directive('courseCoursenav', [
  "settings",
  "Course",
  "$location",
  "Assignment",
  "SessionService",
  function(
    settings,
    Course,
    $location,
    Assignment,
    SessionService
  ) {
    return {
      templateUrl: settings.widgets + 'course/courseNav.html',
      link: function(scope, element, attrs) {

       var url = $location.path().split(/[\s/]+/)[2];
        scope.course = "";
        Course.get({url: url,_populate:"resources"}, function(course){ 
            scope.course = course[0];
            //scope.assignments = scope.course.assignments;
        });

        var c = Course.get({_id:scope.course._id,_populate:"assignments"});
        scope.assignments = c.assignments;
          console.log(scope.assignments);
        

      	scope.hasAssignment = function(assignments) 
      	{
      		  return (typeof assignments !== 'undefined' && assignments.length > 0);          
      	}

      	scope.hasResource = function(rescourcelist) 
      	{
      		return (typeof rescourcelist !== 'undefined' && rescourcelist.length > 0);
      	}

      	scope.isActive = function(route){
          if(route !== $location.path()){
              if( route.indexOf('participants') >= 0){
                route = route.replace("participants", "studentsaddremove");
                return route === $location.path();
              }
          }
      		return route === $location.path();
      	}
      	
    }
  };
}]);

