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

        console.log(course._id);

          scope.pinnedCourses = [];

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
