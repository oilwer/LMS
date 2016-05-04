app.directive('resourcesResources', [
  "settings",
  "User",
  "$routeParams",
    "SessionService",
    "Course",
  function(
    settings,
    User,
    $routeParams,
    SessionService,
     Course
    ) {
    return {
      templateUrl: settings.widgets + 'resources/resources.html',
      link: function(scope, element, attrs) {

          var isDone = false;

          scope.uploadFile = function()
          {
            if (scope.submit())
            {
              console.log("File uploaded");
            }
          }

        scope.resourceList = [];

              //get session_user
              var session_user;
              SessionService.getSession().success(function(response){
                  session_user = response.user;
                  getResources();
              });



                var getResources = function()
                {
                  //session_user = response.user;
                  //request user details, fallback if user changed
                  User.get({_id: session_user._id}, function(user){

                      var courses = user[0].courses;

                      //loop the courses for resources
                      for(var i = 0; i < courses.length; i++) {



                          Course.get({_id: courses[i], _populate: "resources"}, function(course) {


                              if(typeof course[0] !== "undefined"){

                                  if(typeof course[0].resources !== "undefined"){

                              if (course[0].resources.length > 0) {
                                  console.log(course[0].resources);
                                  for (var x = 0; x < course[0].resources.length; x++)
                                      {
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


      } //link
    };
  }
]);
