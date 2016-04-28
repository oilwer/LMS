app.directive('assignmentUpdateUpdateassignment', [
    "settings",
    "$location",
    "$window",
    "$routeParams",
    "Assignment",
    "SessionService",
  function(
    settings,
    $location,
    $window,
     $routeParams,
    Assignment,
    SessionService
  ) {
        
    return {
      templateUrl: settings.widgets + 'assignment/update/updateAssignment.html',
      link: function(scope, element, attrs) {
          
        
        var update = function() {
            //update view
            var textEditor = document.querySelector("trix-editor");
            textEditor.editor.insertHTML(scope.assignment.description);
            scope.newAssignment = {
                name: scope.assignment.name,
                due_date: scope.assignment.due_date,
                description: ""
            };

        };
        
        setTimeout(update,500);
         
          
      scope.updateAssignmentDetails = function() {
          
        //create function
        scope.newAssignment.description = $("#x").attr("value");
                              
        Assignment.update({_id: scope.assignment._id}, {
            name: scope.assignment.name,
            description: scope.newAssignment.description,
            obligatory: scope.newAssignment.obligatory,
            due_date: scope.newAssignment.due_date
        }, function(res)
        {
            $(".assignment_description").empty().append(scope.newAssignment.description);
            scope.assignment.name = scope.newAssignment.name;
            scope.assignment.due_date = scope.newAssignment.due_date;
            scope.assignment.description = scope.newAssignment.description;
            //todo: show user the success (GUI)
            scope.$parent.hideModal();
    
        });
          
      };
          
        scope.closeUpdateAssignment = function() {
            if (confirm('Do you want to close without saving?')) {
                scope.$parent.hideModal();
                scope.newAssignment = {
                    name: scope.assignment.name,
                    due_date: scope.assignment.due_date,
                    description: ""
                };
                //console.log(scope.assignment.description);
                var textEditor = document.querySelector("trix-editor");
                // empty all
                textEditor.editor.insertHTML(scope.assignment.description);
            } else {
                // Do nothing!
            } 
        };
        
          scope.deleteAssignment = function() {
              Assignment.remove({_id: scope.assignment._id});
              scope.$parent.hideModal();
              var theLocation = $location.path().split("/")[2];
              $window.location.href = '/courses/' + theLocation
          };
          
      }//end link
    };
  }
]);