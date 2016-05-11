app.directive('courseCourseslist', [
  "settings",
  "$location",
  "SessionService",
  "User",
  "Course",
  function(
    settings,
    $location,
    SessionService,
    User,
    Course
  ) {
    return {
      templateUrl: settings.widgets + 'course/courseslist.html',
      link: function(scope, element, attrs) {
      scope.heading = "All courses";

      var session_user;

      var getCourse = function(course)
      {
        Course.get({_id: course._id}, function(course)
        {

          return course[0];


        });
      }

      var refresh = function(){


        SessionService.getSession().success(function(response) {
          User.get({_id: response.user._id}, function(user)
          {
              session_user = user;
              scope.pinnedCourses = [];


              if(user[0].courses_pinned.length > 0)
              {

                    var allPinnedCourses = [];

                    for (i = 0; i < user[0].courses_pinned.length; i++) {

                      currentObj = session_user[0].courses_pinned[i];

                      if(currentObj.pinned) {
                        console.log(currentObj);

                        counter++;
                        Course.get({_id: currentObj.course}, function(course)
                        {
                          console.log(course[0]);
                          scope.pinnedCourses.push(course[0]);
                        });


                      }

                    }
             }
             else {
               scope.courses = Course.get();
             }

          });
        });
      };

      //Runs on page update
      refresh();

      //pins course in database
      scope.pinCourse = function(course){


        // scope.courses.pop(course);

        console.log(course._id);



          SessionService.getSession().success(function(response) {
            User.get({_id: response.user._id, _populate:"courses"}, function(user){

              console.log(user[0]);

              var tempCourses = [];
              var tempCourses = user[0].courses;

              console.log(user[0].courses);


              var courseid = course._id;
              var obj = user[0].courses_pinned.filter(function ( obj ) {
                return obj.course === courseid;
              })[0];


              if(obj == undefined)
              {

                console.log("First time to pin course");

                  User.update({
                      _id: user[0]._id
                  },{ $push: {
                        courses_pinned:{
                          course: course._id,
                          pinned: true
                        }
                    }
                  }, function(res)
                {

                  console.log(res);

                  scope.pinnedCourses.push(course);

                  var courseToRemove = scope.courses.indexOf(course);
                  if(courseToRemove != -1) {
          	         scope.courses.splice(courseToRemove, 1);
                   }

                });

            }

            else {

              console.log("Course has been pinned before, now update from ", obj.pinned, " to ", !obj.pinned);

              // Set pinned to false
              User.update(
                {
                  _id: user[0]._id,
                  courses_pinned: {$elemMatch: {course: course._id} }
                },{
                    "courses_pinned.$.pinned" : !obj.pinned
                  }
                , function(res)
              {
                console.log(res);

                if(obj.pinned) {
                    scope.courses.push(course);

                    var courseToRemove = scope.pinnedCourses.indexOf(course);
                    if(courseToRemove != -1) {
                       scope.pinnedCourses.splice(courseToRemove, 1);
                     }
               }
               else {
                 scope.pinnedCourses.push(course);

                 var courseToRemove = scope.pinnedCourses.indexOf(course);
                 if(courseToRemove != -1) {
                    scope.courses.splice(courseToRemove, 1);
                  }
               }

              });

            }

            });
          });
    }



        scope.class = "assignClass"

        scope.courseLocation = function(obj) {
            //console.log(obj.currentTarget.attributes.dataLocation.value);
                  // Redirects to cource url saved in the clicked elements dataLocation attr
            $location.path("courses/" + obj.currentTarget.attributes.dataLocation.value);
        };
        scope.$root.$on('addedCourse', function() {
          refresh();
        });
      }
    };
  }
]);
