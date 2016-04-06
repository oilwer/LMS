app.directive('assignmentItem', [
  "settings",
  "$routeParams",
  "Assignment",
  function(
    settings,
    Assignment,
    $routeParams
  ) {
    
    return {
      templateUrl: settings.widgets + 'assignment/item.html',
      link: function(scope, element, attrs) {
        
        var url = $routeParams.url;

        //Get all courses by name from url, populate fills all the 
        //connected assignments so we can get their data. 
        //ng repeat with response of assignments
        // Assignment.get({ name: url }, function(res){
        //   // scope.assignments = res[0].assignments;
        // });
      }
    };
  }
]);
