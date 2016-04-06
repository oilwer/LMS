app.directive('assignmentButtoncreateassignment', [
    "settings",
    "$location",
  function(
    settings,
    $location
    ) {

    return {
      templateUrl: settings.widgets + 'assignment/buttoncreateassignment.html',
      link: function($scope, element, attrs) {
          
       $scope.assignmentModalShown = false;
          $scope.toggleAssignmentModal = function() { 
              console.log("körs");
            $scope.assignmentModalShown = !$scope.assignmentModalShown;
          };
        
          
         /* scope.createCourse = function() {
            $location.path('/create-course');
          };*/
          
          
      }//link
    };
  }
]);