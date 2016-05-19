app.directive('courseListadded', [
  "settings",
  "$location",
  "SessionService",
  "User",
  "Course",
  "Assignment",
  "Resource",
  function(
    settings,
    $location,
    SessionService,
    User,
    Course,
    Resource,
    Assignment
  ) {
    return {
      templateUrl: settings.widgets + 'course/listadded.html',
      link: function(scope, element, attrs) {


      var url = $location.path().split(/[\s/]+/)[2];
       scope.course = "";
       Course.get({url: url,_populate:"resources"}, function(course){
           scope.course = course[0];
           //scope.assignments = scope.course.assignments;
       });

      var c = Course.get({_id:scope.course._id,_populate:"assignments"});
      scope.assignments = c.assignments;



        var refresh = function(){
          SessionService.getSession().success(function(response) {
            User.get({_id: response.user._id, _populate:"courses"}, function(user){
              scope.myCourses = [];
              for (var i = 0; i < scope.myCourses.length; i++) {
                if(user[0].courses[i].courses_pinned.pinned){
                  scope.myPinnedCourses = user[0].courses;

                }
              };

              // console.log(user[0].courses[i]);

            });
          });
        }

        //Runs on page update
        refresh();

        scope.class = "assignClass"
        scope.$root.$on('addedCourse', function() {
          refresh();
        });
      }
    }
  }
]);
