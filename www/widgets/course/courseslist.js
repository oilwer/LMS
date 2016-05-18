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

        var session_user;

        var getCourse = function(course){
          Course.get({_id: course._id}, function(course) {
            return course[0];
          });
        }

        var refresh = function(){
          SessionService.getSession().success(function(response) {
            User.get({_id: response.user._id, _populate:"courses"}, function(user){
              session_user = user;

              if(session_user[0].role == "admin"){
                scope.heading = "All courses";
              } else if (session_user[0].role == "student") {
                scope.heading = "My courses";
              }

              scope.pinnedCourses = [];

              if(user[0].courses_pinned.length != 0) {
                var allPinnedCourses = [];

                for (i = 0; i < user[0].courses_pinned.length; i++) {
                  currentObj = session_user[0].courses_pinned[i];
                  if(currentObj.pinned) {
                    Course.get({_id: currentObj.course}, function(course) {
                      scope.pinnedCourses.push(course[0]);
                      if(session_user[0].role == "admin") {
                        scope.courses = Course.get();
                      } else if (session_user[0].role == "student") {
                        scope.courses = session_user[0].courses;
                      }
                    });
                  } else {
                    if(session_user[0].role == "admin") {
                      scope.courses = Course.get();
                    } else if (session_user[0].role == "student") {
                      scope.courses = session_user[0].courses;
                    }
                  }
                }
              }
             if(user[0].courses_pinned.length == 0) {
               if(session_user[0].role === "admin")
               {
                 scope.courses = Course.get();
               }
               else if(session_user[0].role === "student") {
                 scope.courses = session_user[0].courses;
               }
             }
           });
         });

       }

        //Runs on page update
        refresh();

        function findWithAttr(array, attr, value) {
          for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
          }
        }

        //pins course in database
        scope.pinCourse = function(course){

          course.pin = "hej";
          // Updates session

          SessionService.updateSession(session_user[0].email).success(function(session) {
            session_user[0] = session;
          });
          SessionService.getSession().success(function(response) {
            User.get({_id: response.user._id, _populate:"courses"}, function(user){
              var tempCourses = [];
              var tempCourses = user[0].courses;
              var courseid = course._id;

              var obj = user[0].courses_pinned.filter(function ( obj ) {
                return obj.course === courseid;
              })[0];

              if(obj == undefined) {
                  User.update({
                      _id: user[0]._id
                  },{ $push: { courses_pinned:{
                          course: course._id,
                          pinned: true
                        }}}, function(res){
                          scope.pinnedCourses.push(course);
                  });
              } else {
                // Set pinned to false
                User.update({ _id: user[0]._id,
                    courses_pinned: {$elemMatch: {course: course._id} }
                  },{ "courses_pinned.$.pinned" : !obj.pinned }, function(res) {

                    if(obj.pinned) {
                      scope.pinnedCourses.splice(findWithAttr(scope.pinnedCourses, "_id", course._id), 1);
                    } else {
                      scope.pinnedCourses.push(course);
                    }
                });
              }
            });
          });
        }

        scope.class = "assignClass"

        scope.courseLocation = function(obj) {
          $location.path("courses/" + obj.currentTarget.attributes.dataLocation.value);
        };
        scope.$root.$on('addedCourse', function() {
          refresh();
        });
      }
    }
  }
]);
