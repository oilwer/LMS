app.directive('connectConnectstudents', [
  "settings",
  "User",
  "Course",
  "$routeParams",
  function(
    settings,
    User,
    Course,
    $routeParams
  ) {
	  
    return {
      templateUrl: settings.widgets + 'connect/connectstudents.html',
      link: function(scope, element, attrs) {
	  		
        var url = $routeParams.url;

        //Get all courses by name from url, populate fills all the 
        //connected studests so we can get their data. 
        //ng repeat with response of students
        var course = Course.get({ name: url , _populate:"students"}, function(res){
          scope.users = res[0].students;
        });
      }
    };
  }
]);
