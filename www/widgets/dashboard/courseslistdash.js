app.directive('dashboardCourseslistdash', [
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
      templateUrl: settings.widgets + 'dashboard/courseslistdash.html',
      link: function(scope, element, attrs) {
      scope.heading = "";


      //updates GUI
      var refresh = function(){
        console.log(scope.user);

        if(scope.user.role === "admin"){
          console.log("is admin");
          scope.heading = "All Courses";
          scope.courses = Course.get();  //returns all courses in database
          console.log(scope.courses);
        }

        else {
          SessionService.getSession().success(function(response){
            User.get({_id: response.user._id, _populate:"courses"}, function(user){
              console.log(user[0].courses);
              scope.courses = user[0].courses;  
              console.log("is NOT admin");
              scope.heading = "My Courses";
            })
          })
        } //returns student's courses
      };
      

      scope.user = "";
      SessionService.getSession().success(function(response){
        User.get({_id: response.user._id}, function(user){
          scope.user = user[0];
          refresh();
        })
      })

      //Runs on page update
    

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
                      Course: course,
                      pinned: true
                    }
                }
              }, function(res)
            {
              console.log(res);
            /*  for (var i = 0; i < tempCourses.length; i++) {
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
