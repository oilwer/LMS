app.directive('resourcesResources', [
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
      templateUrl: settings.widgets + 'resources/resources.html',
      link: function(scope, element, attrs) {
          
          var session_user;
          var theLocation;
          var theLocationPath;
          scope.filterSelectedCourse;
          var url;
          //scope.course = "";
          scope.showAll = false;
          scope.title = "My resources";
          
          var setupResources = function() {
              scope.showAll = false;
              theLocationPath = $location.path();
              theLocation = theLocationPath.split("/");
              
              if(theLocation[1] === "resources") {
                  scope.showAll = true;
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

                scope.resourceList = [];
                scope.courseFilter = [];

              //get session_user
              SessionService.getSession().success(function(response){
                  session_user = response.user;
                  if(scope.showAll) {
                      getAllResources();
                  }
                  else {
                      //get current course
                      scope.title = "Resources";
                      Course.get({url: url, _populate: "resources"}, function(course){
                        var theCourse = course[0];
                          console.log(url, theCourse);
                          scope.resourceList= theCourse.resources;
                          for (var i = 0; i < theCourse.resources.length; i++) {
                              theCourse.resources[i].course = theCourse.name;
                          }
                      });
                  }
              });
          }
          
            var getAllResources = function()
            {
              //request user details, fallback if user changed
              User.get({_id: session_user._id}, function(user){

                  var courses = user[0].courses;

                  //loop the courses for resources
                  for(var i = 0; i < courses.length; i++) {

                      Course.get({_id: courses[i], _populate: "resources"}, function(course) {


                          if(typeof course[0] !== "undefined"){

                            if(typeof course[0].resources !== "undefined"){

                              if (course[0].resources.length > 0) {
                                  scope.courseFilter.push(course[0].name);
                                  for (var x = 0; x < course[0].resources.length; x++)
                                      {
                                          course[0].resources[x].course = course[0].name;
                                          scope.resourceList.push(course[0].resources[x]); 
                                      }          

                              } else {
                                  console.log("no resources found");
                              }

                            }

                          }
                      });
                  }
              });
            }
                
        scope.castTheResourceModal = function() {
          scope.$root.$broadcast('showTheResourceModal');
        };
          
        setupResources();
        scope.$root.$on('refreshResourceList', function() {
            setupResources();
        });
          
        scope.updateLocation = function(resourceUrl) {
            $location.path(theLocationPath + resourceUrl);
        }
        
        scope.test = function() {
            console.log(scope.filterSelectedCourse);
        }
      } //link
    };
  }
]);
