app.directive('assignmentUpdateUpdateassignment', [
    "settings",
    "$location",
    "$window",
    "Assignment",
    "SessionService",
  function(
    settings,
    $location,
    $window,
    Assignment,
    SessionService
  ) {
        
    return {
      templateUrl: settings.widgets + 'assignment/update/updateAssignment.html',
      link: function(scope, element, attrs) {
          

          
          console.log("körs");
      }//end link
    };
  }
]);