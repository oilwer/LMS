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

          function findWithAttr(array, attr, value) {
              for(var i = 0; i < array.length; i += 1) {
                  if(array[i][attr] === value) {
                      return i;
                  }
              }
          }

            var getAllResources = function()
            {

              scope.resourceList = [];

              SessionService.getSession().success(function(session) {

            //    console.log(session.user);
                // Updates session
                SessionService.updateSession(session.user.email).success(function(session) {
              //    console.log("Updated session: ", session);
                  session_user[0] = session;

                    Course.get({students: session._id, _populate:"resources"}, function(mycourses)
                    {
                      console.log(mycourses);

                      for (var i = 0; i < mycourses.length; i++) {
                        for (var x = 0; x < mycourses[i].resources.length; x++) {

                          console.log(mycourses[i].resources[x]);

                          scope.resourceList.push(mycourses[i].resources[x]);

                          var indexOfResource = findWithAttr(scope.resourceList, "uploaded_by", mycourses[i].resources[x].uploaded_by);

                        //  console.log(User.get({_id: mycourses[i].resources[x].uploaded_by}));

                          //  scope.resourceList[indexOfResource].author;
                             User.get({_id: mycourses[i].resources[x].uploaded_by}, function(user)
                           {
                             scope.resourceList[indexOfResource].author = (user[0].first_name + " " + user[0].last_name);
                           });

                          /*
                          User.get({_id: mycourses[i].resources[x].uploaded_by}, function(user)
                          {
                            // returnAllResources(user);
                            console.log(i, x);

                            console.log(user[0]);

                            console.log(mycourses[i].resources[x]);

                            scope.resourceList.push(mycourses[i].resources[x]);

                          });
                          */


                        }
                      }

                    });


              //    console.log(session.courses);


                  // Get an array of all courses i can access
                      // Loop thorugh my courses
                          // Loop through theses course's resoucres
                              // Add to resourceslist


                // GUI stuff

                });

              });


              //request user details, fallback if user changed
              /*
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

              */
            }



        scope.castTheResourceModal = function() {
          scope.$root.$broadcast('showTheResourceModal');
        };

        setupResources();
        scope.$root.$on('refreshResourceList', function() {
            setupResources();
        });

        scope.updateLocation = function(resourceUrl) {
            try {
                $location.path(theLocationPath + resourceUrl);
            } catch (e) {
                console.log(e);
            } finally {

            }

        }

        scope.test = function() {
            console.log(scope.filterSelectedCourse);
        }
      } //link
    };
  }
]);
