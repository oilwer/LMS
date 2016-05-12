app.directive('resourcesUpdateUpdateresource', [
    "settings",
    "$location",
    "$window",
    "$routeParams",
    "Resource",
    "Course",
    "SessionService",
  function(
    settings,
    $location,
    $window,
     $routeParams,
    Resource,
     Course,
    SessionService
  ) {
        
    return {
      templateUrl: settings.widgets + 'resources/update/updateResource.html',
      link: function(scope, element, attrs) {
          
        
        var update = function() {
            //update view
            $("#resourceContent").attr("value", scope.theResource.content);

            scope.newResource = {
                name: scope.theResource.title,
                file: scope.theResource.filename,
                content: ""
            };

        };
        
        setTimeout(update,200);
         
          
      scope.updateResourceDetails = function() {
          
        //create function
        /*scope.newResource.description = $("#resourceContent").attr("value");
                              
        Resource.update({_id: scope.assignment._id}, {
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
    
        });*/
          
      };
          
        scope.closeUpdateResource = function() {
            if (confirm('Do you want to close without saving?')) {
                scope.$parent.hideModal();
                scope.newResource = {
                    name: scope.theResource.title,
                    fileName: scope.theResource.filename,
                    content: ""
                };
                //console.log(scope.assignment.description);
                var textEditor = document.querySelector("trix-editor");
                // empty all
                textEditor.editor.insertHTML(scope.theResource.content);
            } else {
                // Do nothing!
            } 
        };
        
          scope.deleteResource = function() {
              Resource.remove({_id: scope.theResource._id});
                Course.get({_id: scope.theResource.course}, function(course) {
                    var resources = course[0].resources;
                    for( var i = 0; i < resources.length; i++ ) {
                        if (resources[i] === scope.theResource._id) {
                            console.log("remove the resource from the course in some way?")
                        }
                    }
                });

              scope.$parent.hideModal();
              //get path without last segment
              var theLocation = $location.path().split("/")
              theLocation.pop();
              theLocation = theLocation.join("/");
              $location.path(theLocation); 
          };
          
      }//end link
    };
  }
]);