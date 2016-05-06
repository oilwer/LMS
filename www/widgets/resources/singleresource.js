app.directive('resourcesSingleresource', [
  "settings",
  "User",
  "$routeParams",
    "$location",
    "SessionService",
    "Course",
  function(
    settings,
    User,
    $routeParams,
     $location,
    SessionService,
     Course
    ) {
    return {
      templateUrl: settings.widgets + 'resources/singleResource.html',
      link: function(scope, element, attrs) {
          

          var session_user;
          var theLocation;
          var theLocationPath;
          var url;
          scope.course = "";
          scope.showAll = false;
          scope.title = "My resources";
          
          var setupTheResource = function() {
              scope.showAll = false;
              theLocationPath = $location.path();
              theLocation = theLocationPath.split("/");
              
              if(theLocation[1] === "resources") {
                  scope.showAll = true;
                  url = theLocation[1];
              } else {
                  //get the course url
                  for (var i = 0; i < theLocation.length; i++ ) {
                      if(theLocation[i] === "courses") {
                          url = theLocation[i+1];
                          break;
                      }
                  }
              }

                SessionService.getSession().success(function(response) {
                  scope.session_user = response.user;
                });

                //scope.resourceList = [];
                //scope.courseFilter = [];
              scope.theResource;
              console.log(url);

              //get session_user
              SessionService.getSession().success(function(response){
                  session_user = response.user;
                  
                 /* Course.get({url: url, _populate: "resources"}, function(course){
                    scope.course = course[0];
                      scope.resourceList= scope.course.resources;
                      for (var i = 0; i < scope.course.resources.length; i++) {
                          scope.course.resources[i].course = scope.course.name;
                      }
                  });*/
              });
          }
          
          
        setupTheResource();
          
        scope.updateLocation = function(resourceUrl) {
            $location.path(theLocationPath + resourceUrl);
        }

      } //link
    };
  }
]);
