app.directive('dashboardAdmindash', [
  "settings",
  "$location",
  "Course",
  function(
    settings,
    $location,
    Course
  ) {

    return {
      templateUrl: settings.widgets + 'dashboard/admindash.html',
      link: function(scope, element, attrs) {
          
          scope.pathLocation = function(newLocation) {
            $location.path(newLocation);
        }
          
                  //show hide modal create course
        scope.modalShown = false;
          
        scope.toggleModal = function() {
            scope.modalShown = !scope.modalShown;
            //fix for toolbar toggle, element event don't fire on modalshow()
            scope.isToolbarPersonalOpen = false;
            scope.isToolbarCreateOpen = false;
          };
          
        //show hide modal create assignment
        scope.assignmentModalShown = false;
        scope.toggleAssignmentModal = function() { 
            scope.assignmentModalShown = !scope.assignmentModalShown;
          };
        
      
      }

    };
  }
]);