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

      var refresh = function(){
        scope.courses = Course.get();
      };
            //Runs on page update
      refresh();

      //pins course in database
      scope.pinCourse = function(course){

        console.log(course);

          scope.pinnedCourses = [];

          SessionService.getSession().success(function(response) {
            User.get({_id: response.user._id, _populate:"courses"}, function(user){

              console.log(user[0]);

              var tempCourses = [];
              var tempCourses = user[0].courses;

              console.log(user[0].courses);

              User.update({
                  _id: user[0]._id
              },{ $push: {
                    courses:{
                      Course: course._id,
                      pinned: true
                    }
                }
              }, function(res)
            {
              console.log(res);
            /*for (var i = 0; i < tempCourses.length; i++) {
                if(tempCourses[i] == courseName){
                  scope.pinnedCourses.push(tempCourses[i]);
                  console.log(scope.pinnedCourses);
                }
              }
            */
            });




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
