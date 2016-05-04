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

          	SessionService.getSession().success(function(response) {
              scope.session_user = response.user;
            });

          scope.uploadFile = function()
          {
            if (scope.submit())
            {
              console.log("File uploaded");

            //  comment += document.getElementsByName("content")[0].value;

              //console.log(scope.file);
              var strippedFileName = scope.file[0].name.replace(/[\n\t\r\x20]/g, "_");

              console.log(strippedFileName);

              Course.update({
                _id: "5729c5b6b97cfa5e04ba025e"
              },{ $push: {
                  resources:{
                    filename: strippedFileName,
                    uploaded_by: scope.session_user._id
                  }
                }
              }, function(res)
            {
              console.log(res);
              getResources();
            });


            }
          }

        scope.resourceList = [];
        scope.courseFilter = [];

              //get session_user
              var session_user;
              SessionService.getSession().success(function(response){
                  session_user = response.user;
                  getResources();
              });

                var getResources = function()
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


      } //link
    };
  }
]);
