app.directive('resourcesCreateCreateresources', [
    "settings",
    "$location",
    "$window",
    "Course",
    "Resource",
    "SessionService",
  function(
    settings,
    $location,
    $window,
    Course,
     Resource,
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
            
            scope.$$childTail.submit();
            
            var strippedFileName = scope.file[0].name.replace(/[\n\t\r\x20]/g, "_");
            console.log(strippedFileName);
            
            var description = $("#createNewResource").attr("value");
            var resourceUrl = scope.resourceTitle.replace(/[\n\t\r\x20]/g, "_");
            var resource = {
                title: scope.resourceTitle,
                filename: strippedFileName,
                url: resourceUrl,
                course: scope.courseSelect.repeatSelect,
                content: description,
                uploaded_by: scope.session_user._id,
                uploaded_on: new Date()
              };
              /*
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
            */
            Resource.create(resource, function(res) {
                Course.get({ _id: res[0].course}, function(x) {
                    //Update Course and Continue
                    Course.update({_relate:{items:x[0],resources:res[0] }});
                    Resource.update({ _relate:{ items:res[0], course:x[0]}}, function(newres){
                        /*Assignment.get({_id: res[0]._id}, function(newAssignment){
                            //oldassignment = JSON.parse(JSON.stringify(newAssignment[0]));
                            //console.log("ass, id", newAssignment[0]._id);
                            //console.log("file:",scope.$$childTail.file[0].name);
                            //console.log(scope.file);

                        });*/
                        scope.closeModalSession();
                        scope.castTheResourceList();
                    });
                });
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
