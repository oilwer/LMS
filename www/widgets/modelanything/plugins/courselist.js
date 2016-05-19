app.directive('modelanythingPluginsCourselist', [
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
      templateUrl: settings.widgets + 'modelanything/plugins/courselist.html',
      link: function(scope, element, attrs) {

        var session_user;
        var getCourse = function(course) {
          Course.get({_id: course._id}, function(course) {
            return course[0];
          });
        }

        var refresh = function(){
          SessionService.getSession().success(function(response) {
            User.get({_id: response.user._id, _populate:"courses"}, function(user) {
              session_user = user;
              if(session_user[0].role == "admin") {
                scope.heading = "All courses";
              } else if(session_user[0].role == "student") {
                scope.heading = "My courses";
              }
              scope.pinnedCourses = [];

              if(user[0].courses_pinned.length > 0) {
                var allPinnedCourses = [];
                for (i = 0; i < user[0].courses_pinned.length; i++) {
                  currentObj = session_user[0].courses_pinned[i];
                  if(currentObj.pinned) {
                    Course.get({_id: currentObj.course}, function(course) {
                      scope.pinnedCourses.push(course[0]);
                    });
                  }
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
