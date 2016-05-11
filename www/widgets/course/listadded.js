app.directive('courseListadded', [
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
      templateUrl: settings.widgets + 'course/listadded.html',
      link: function(scope, element, attrs) {
      scope.heading = "My courses";

      var refresh = function(){
        
        SessionService.getSession().success(function(response) {

            User.get({_id: response.user._id, _populate:"courses"}, function(user){

              console.log(user[0]);

              scope.myCourses = [];

              for (var i = 0; i < scope.myCourses.length; i++) {
                if(user[0].courses[i].courses_pinned.pinned){
                  scope.myPinnedCourses = user[0].courses;
                }
              }; 
              
              console.log(user[0].courses[i]);
            });
        });
      };
            //Runs on page update
      refresh();

        scope.class = "assignClass"
        scope.$root.$on('addedCourse', function() {
          refresh();
        });
      }
    };
  }
]);
