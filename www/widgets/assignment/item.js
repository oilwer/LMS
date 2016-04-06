app.directive('assignmentsItem', [
  "settings",
  "$routeParams",
  function(
    settings,
    $routeParams
  ) {
    
    return {
      templateUrl: settings.widgets + 'assignments/item.html',
      link: function(scope, element, attrs) {
        
        var url = $routeParams.url;

        //Get all courses by name from url, populate fills all the 
        //connected assignments so we can get their data. 
        //ng repeat with response of assignments
        var assignemnts = Assignments.get({ name: url , _populate:"assignments"}, function(res){
          // scope.assignments = res[0].assignments;
        });
      }
    };
  }
]);
