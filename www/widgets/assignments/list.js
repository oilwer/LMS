app.directive('assignmentsList', [
  "settings",
  "$routeParams",
  function(
    settings,
    $routeParams
  ) {
    
    return {
      templateUrl: settings.widgets + 'assignments/list.html',
      link: function(scope, element, attrs) {
        
          var url = $routeParams.url;

          //Get all courses by name from url, populate fills all the 
          //connected studests so we can get their data. 
          //ng repeat with response of students
          Assignment.get({ name: url}, function(res){
              // scope.assignments = res[0].assignments;
          });
      }
    };
  }
]);
