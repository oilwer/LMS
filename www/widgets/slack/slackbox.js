app.directive('slackSlackbox', [
  "settings",
  "ChatService",
  "User",
  "SessionService",
  "Course",
  "Channel",
  "$location",
  "$interval",
  function(
    settings,
    ChatService,
    User,
    SessionService,
    Course,
    Channel,
    $location,
    $interval
  ) {

    return {
      templateUrl: settings.widgets + 'slack/slackbox.html',
      link: function(scope, element, attrs) {

        var savedUser;

        //Get messages with callback
        var getMessages = function(channelName, UserIdentifier, callback){
          scope.messages = [];

          console.log(savedUser.courses);

          var name = channelName;

          var obj = savedUser.courses.filter(function ( obj ) {
            return obj.code === name;
          })[0];

          console.log(obj);

           ChatService.getMessages(obj.slack_channels[0].channelId, UserIdentifier).success(function(response){
              console.log("Response", response);
              callback(response.messages);
            });


        }

        scope.showChatBox = function(course) {


          if(scope.course != undefined) {

            if (scope.course.messages != undefined)
              {
                scope.course.messages = undefined;
                }
                scope.course = undefined;
          }

            //slack connection depending on course
            scope.course = "";
            scope.course = course;
            scope.courseSelected = true;
            getMessages(course.code, savedUser.email, function(messages){
              console.log(messages);
              scope.course.messages = "";
              scope.course.messages = messages;
            });

        }

        SessionService.getSession().success(function(response) {

          User.get({_id: response.user._id, _populate: "courses"}, function(user)
          {
            scope.courselist = user[0].courses;
            console.log(user);
            savedUser = user[0];
          });

        });



      /*  scope.getMessages = function(){
          $interval(listenMessages, 1000);
        }
    */

      }
    }
  }
]);
