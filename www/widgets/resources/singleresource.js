app.directive('resourcesSingleresource', [
  "settings",
  "User",
  "$routeParams",
    "$location",
    "SessionService",
    "Course",
    "Resource",
  function(
    settings,
    User,
    $routeParams,
     $location,
    SessionService,
     Course,
     Resource
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
              
              //check if resource view is global or assigned a course
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

              scope.theResource;
              //console.log(theLocation);
              Resource.get({url: theLocation.pop()}, function(resource) {
                  scope.theResource = resource[0];
                  console.log(scope.theResource);
                  $(".resourceContent").append(scope.theResource.content);
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
