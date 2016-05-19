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
          
       scope.isChildOpen;
       var fullUrl = $location.path();
       var url = fullUrl.split(/[\s/]+/)[2];
        var nextPath = fullUrl.split(/[\s/]+/)[3];
        scope.course = "";
        Course.get({url: url,_populate:"resources"}, function(course){
            scope.course = course[0];
            //scope.assignments = scope.course.assignments;
        });

        var c = Course.get({_id:scope.course._id,_populate:"assignments"});
        scope.assignments = c.assignments;
          
         Course.get({url: url, _populate:"assignments"}, function(course){
            scope.course = course[0];
            $('.courseDescriptionContent').empty().append(scope.course.description);
            scope.assignments = scope.course.assignments;
        });


      	scope.hasAssignment = function(assignments)
      	{
      		  return (typeof assignments !== 'undefined' && assignments.length > 0);
      	}

      	scope.hasResource = function(rescourcelist)
      	{
      		return (typeof rescourcelist !== 'undefined' && rescourcelist.length > 0);
      	}
        
        if (nextPath === "assignment") {
              scope.isChildOpen = true;
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
        
        scope.isSingleResource = function(route){
      		return route === nextPath;
      	}
        
    }
  };
}]);
