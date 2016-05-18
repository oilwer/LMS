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
      templateUrl: settings.widgets + 'resources/update/updateresource.html',
      link: function(scope, element, attrs) {
          
        
        var setupUpdate = function() {
            console.log("the resource", scope.theResource);
            scope.newResource = {
            name: scope.theResource.title,
            file: scope.theResource.filename,
            content: scope.theResource.content
        };
          
            //update view
            if(scope.theResource.content !== undefined) {
                $("#resourceContent").attr("value", scope.theResource.content);
            }
            console.log(scope);
            
        }
        
        scope.$root.$on('setupUpdateScope', function() {
            setupUpdate();
        });
          
      scope.updateResourceDetails = function() {
          console.log("kör update");
        if (scope.file) {
            if (scope.file[0]) {
                var strippedFileName = scope.file[0].name.replace(/[\n\t\r\x20]/g, "_");
            }
        }
        else {
            var strippedFileName = undefined;
        }
          
        scope.newResource.file = strippedFileName;
        //create function
        scope.newResource.content = $("#resourceContent").attr("value");
                          
        Resource.update({_id: scope.theResource._id}, {
            title: scope.newResource.name,
            filename: scope.newResource.file,
            content: scope.newResource.content
        }, function(res)
        {            
            scope.$root.$broadcast('reloadTheResource');
            //todo: show user the success (GUI)
            //update view
        $("#resourceContent").attr("value", scope.theResource.content);

        scope.theResource = {
            name: scope.newResource.title,
            file: scope.newResource.filename,
            content: scope.newResource.content
        };
            scope.$parent.hideModal();
    
        });
          
      };
          
        scope.closeUpdateResource = function() {
            console.log("körs");
            if (confirm('Do you want to close without saving?')) {
                scope.$parent.hideModal();
                scope.newResource = {
                    name: scope.theResource.title,
                    fileName: scope.theResource.filename,
                    content: scope.theResource.content
                };
                var textEditor = document.querySelector("trix-editor");
                // empty all
                textEditor.editor.insertHTML(scope.theResource.content);
            } else {
                // Do nothing!
            } 
        };
        
          scope.deleteResource = function() {
              Resource.remove({_id: scope.theResource._id});
              
              Course.update(
                  {_id: scope.theResource.course}, 
                  {$pull: {"resources": scope.theResource._id}}, function() {
                      scope.$parent.hideModal();
                      //get path without last segment
                      var theLocation = $location.path().split("/")
                      theLocation.pop();
                      theLocation = theLocation.join("/");
                      $location.path(theLocation); 
              });
              
          };
          
      }//end link
    };
  }
]);