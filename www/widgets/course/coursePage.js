app.directive('courseCoursepage', [
  "settings",
  "$location",
  "SessionService",
  "Course",
  "User",
  "$routeParams",
  function(
    settings,
    $location,
    SessionService,
    Course,
    User,
    $routeParams
  ) {

    return {
      templateUrl: settings.widgets + 'course/coursePage.html',
      link: function(scope, element, attrs) {

        var session_user;
        SessionService.getSession().success(function(response){
          session_user = response.user;
        });

        var refresh = function(){
            var url = $location.path().split(/[\s/]+/).pop();
            Course.get({url: url}, function(result){ 
              scope.course = result[0];
              scope.messages = scope.course.messages;
          });
        };  

        //Runs on page update
        refresh();

       

        scope.publishMsg = function(){
            var course = scope.course;
            var date = new Date();
            var today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

            Course.update({
                _id: course._id
            },{ $push: {
                  messages:{
                  title: scope.title,
                  content: scope.content,
                  creator: session_user,
                  date: today                  
                }
              }
            });
            // Refresh GUI
            // do not refresh, push message to messages
            refresh();              
        }    
              
        //     //TODO: 
        //     //display changes in view (notifications)
        //     //Progress
        // };       
      }
    };
  }
]);