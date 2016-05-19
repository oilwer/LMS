app.directive('modelanythingPluginsTeacherpanel', [
  "settings",
  "Course",
  function(
    settings,
    Course
  ) {

    return {
      templateUrl: settings.widgets + 'modelanything/plugins/teacherpanel.html',
      link: function(scope, element, attrs) {
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