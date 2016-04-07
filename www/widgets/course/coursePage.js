app.directive('courseCoursepage', [
  "settings",
  "$location",
  "SessionService",
  "Course",
  "User",
  "$routeParams",
  "Assignment",
  function(
    settings,
    $location,
    SessionService,
    Course,
    User,
    $routeParams,
    Assignment
  ) {

    return {
      templateUrl: settings.widgets + 'course/coursePage.html',
      link: function(scope, element, attrs) {

        var session_user;
        SessionService.getSession().success(function(response){
          session_user = response.user;
        });

        scope.course = "";

        var url = $location.path().split(/[\s/]+/).pop();
        Course.get({url: url}, function(course){ 
            scope.course = course[0];
            scope.messages = scope.course.messages; //load messages               
        });  

        User.get({_id: scope.course.creator}, function(user){
          scope.teacher = user[0].first_name + " " + user[0].last_name;
          scope.teacherUrl = user[0].public_url;
        });

        Assignment.get({course: scope.course._id}, function(assignment){
          scope.assignments = assignment;
        }); 

        var refresh = function(){
            Course.get({url: url}, function(course){ 
              scope.course = course[0];
              scope.messages = scope.course.messages; //load messages               
            });          
        };            

        //Runs on page update
        //refresh();  
      
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