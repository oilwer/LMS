app.directive('courseCoursepage', [
  "settings",
  "$location",
  "SessionService",
  "Course",
  "User",
  "$routeParams",
  "Assignment",
  "$filter",
  function(
    settings,
    $location,
    SessionService,
    Course,
    User,
    $routeParams,
    Assignment,
    $filter
  ) {

    return {
      templateUrl: settings.widgets + 'course/coursePage.html',
      link: function(scope, element, attrs) {
    
      
        var session_user;
        SessionService.getSession().success(function(response){
          session_user = response.user;
        });


        scope.course = "";
        scope.assignments = "";

        var url = $location.path().split(/[\s/]+/).pop();
        Course.get({url: url, _populate:"assignments"}, function(course){ 
            scope.course = course[0];   
            scope.assignments = scope.course.assignments;

            User.get({_id: scope.course.creator}, function(user){
              scope.teacher = user[0].first_name + " " + user[0].last_name;
              scope.teacherUrl = user[0].public_url;
            });
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
          if(scope.title && scope.content){
            var course = scope.course;
            var date = new Date();
            var today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
           


            console.log(today);
            Course.update({
                _id: course._id
            },{ $push: {
                  messages:{
                    title: scope.title,
                    content: scope.content,
                    creator: session_user,
                    date: date                  
                  }
              }
            });
            // Refresh GUI
            // do not refresh, push message to messages
            refresh();              
        }
        return false;
      }

      

      scope.editInfo = function () {
        console.log("yolod");
      };
          
        scope.castTheAssignmentModal = function() {
            scope.$root.$broadcast('showTheAssignmentModal');
        };
        

    
              
        //     //TODO: 
        //     //display changes in view (notifications)
        //     //Progress
        // };       
      }
    };
  }
]);