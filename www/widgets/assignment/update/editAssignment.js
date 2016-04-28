app.directive('assignmentUpdateEditassignment', [
    "settings",
    "$location",
    "$window",
    "$routeParams",
    "Assignment",
    "User",
    "SessionService",
  function(
    settings,
    $location,
    $window,
     $routeParams,
    Assignment,
    User,
    SessionService
  ) {

    return {
      templateUrl: settings.widgets + 'assignment/update/editAssignment.html',
      link: function(scope, element, attrs) {
        scope.newAssignment = {};
        var comment = "";


        var update = function() {
            var textEditor = document.querySelector("trix-editor[input='studentEditAssignment']");
            textEditor.editor.insertHTML(scope.comment);
            scope.newAssignment = {
                comment: ""
            };
        };

        setTimeout(update, 500);

        scope.editSubmittedAnswer = function() {

            scope.submit();
            //create function
            scope.newAssignment.comment = $("#studentEditAssignment").attr("value");
            var strippedFileName = scope.file[0].name.replace(/[\n\t\r\x20]/g, "_");


            User.update({
                _id: scope.session_user._id,
                assignments: {$elemMatch: {assignment: scope.assignment._id}
                }
                },{
                    "assignments.$.comment" :  scope.newAssignment.comment,
                    "assignments.$.answer_file" : strippedFileName
                  }
                );

            $('.assignment-isAnswered p:first-child').empty().append("<hr>" + scope.newAssignment.comment +"\n" + strippedFileName);
            scope.$parent.hideModal();
        };

        scope.closeEdit = function() {
            //if (confirm('Do you want to close wothout saving?')) {
                scope.$parent.hideModal();
                /*scope.newAssignment = {
                    name: scope.assignment.name,
                    due_date: scope.assignment.due_date,
                    description: ""
                };
                console.log(scope.assignment.description);
                var textEditor = document.querySelector("trix-editor");
                textEditor.editor.setSelectedRange([0,3]);
                textEditor.editor.insertHTML(scope.assignment.description);
            } else {
                // Do nothing!
            } */
        }
      }//end link
    };
  }
]);
