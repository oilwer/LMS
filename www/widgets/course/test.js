app.directive('courseTest', [
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
      templateUrl: settings.widgets + 'course/test.html',
      link: function(scope, element, attrs) {

        var session_user;
        SessionService.getSession().success(function(response){
          session_user = response.user;
        });

        var refresh = function(){
            var url = $location.path().split(/[\s/]+/).pop();
            Course.get({url: url}, function(result){ 
              scope.course = result[0];
          });
        };  

        scope.getName = function(messageid){ 
            // User.getById(messageid, function(result){
            //     console.log(result.first_name);
            // });
            // User.get({_id: messageid}, function(result){ 
            //    console.log(result[0].first_name);
            //     return result[0].first_name;
            // });
        }
              
        //Runs on page update
        refresh();

        scope.publishMsg = function(){
            var course = scope.course;
            var date = new Date();
            var today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

            Course.update({
                _id: course._id
            },{
              messages:[{
                  title: scope.title,
                  content: scope.content,
                  creator: session_user,
                  date: today                  
              }]
            });
            // Refresh GUI
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
