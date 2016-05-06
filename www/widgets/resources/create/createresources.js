app.directive('resourcesCreateCreateresources', [
    "settings",
    "$location",
    "$window",
    "Course",
    "SessionService",
  function(
    settings,
    $location,
    $window,
    Course,
    SessionService
  ) {

    return {
      templateUrl: settings.widgets + 'resources/create/createresources.html',
      link: function(scope, element, attrs) {

        //get session_user
        scope.session_user;
        SessionService.getSession().success(function(response){
            scope.session_user = response.user;
        });

        scope.resourceTitle;

        AvailableCourses = Course.get();
        scope.courseSelect = {
            repeatSelect: null,
            availableOptions: AvailableCourses
        }

        scope.selectCourseChanged = function (){
            selectedCourseName = scope.courseSelect.repeatSelect;
            console.log("selected course on change", selectedCourseName);
        }
          
        //create a new course and set GUI edit options
        scope.createResource = function(){
            
            var strippedFileName = scope.file[0].name.replace(/[\n\t\r\x20]/g, "_");
            console.log(strippedFileName);
            
            var description = $("#createNewResource").attr("value");
            var resourceUrl = scope.resourceTitle.replace(/[\n\t\r\x20]/g, "_");
            
              Course.update({
                _id: scope.courseSelect.repeatSelect
              },{ $push: {
                  resources:{
                    title: scope.resourceTitle,
                    filename: strippedFileName,
                    url: resourceUrl,
                    content: description,
                    uploaded_by: scope.session_user._id
                  }
                }
              }, function(res)
            {
              console.log(res);
              scope.closeModalSession();
              scope.castTheResourceList();
                  
            });
        }

        
        scope.castTheResourceList = function() {
           scope.$root.$broadcast('refreshResourceList');
        };
        scope.closeModalSession = function() {
            scope.resourceTitle = "";
            scope.courseSelect.repeatSelect = "";
            scope.$parent.hideModal();
        }

      }//end link
    };
  }
]);
