app.directive('slackSlackbox', [
  "settings",
  "ChatService",
  "User",
  "SessionService",
  "Course",
  "Channel",
  "$location",
  "$interval",
  "$timeout",
  function(
    settings,
    ChatService,
    User,
    SessionService,
    Course,
    Channel,
    $location,
    $interval,
    $timeout
  ) {

    return {
      templateUrl: settings.widgets + 'slack/slackbox.html',
      link: function(scope, element, attrs) {

        var savedUser;

        var sendMessage = function(channelName, text, UserIdentifier, callback){
          var name = channelName;
          var obj = savedUser.courses.filter(function ( obj ) {
            return obj.code === name;
          })[0];

          ChatService.sendMessage(obj.slack_channels[0].channelId, text, UserIdentifier).success(function(response){
            //console.log("Response", response);
            ChatService.getMessages(obj.slack_channels[0].channelId, UserIdentifier).success(function(response){
              console.log("Response", response);
              callback(response.messages.reverse());
              });
          });
        }

        //Get messages with callback
        var getMessages = function(channelName, UserIdentifier, callback){
          scope.messages = [];
          var name = channelName;
          var obj = savedUser.courses.filter(function ( obj ) {
            return obj.code === name;
          })[0];

           ChatService.getMessages(obj.slack_channels[0].channelId, UserIdentifier).success(function(response){
              if(response.error == "not_authed"){
                callback(response.error);
              } else {
                callback(response.messages.reverse());
              }
            });
        }

        var courseGlobal;
        var gmPromise;
        var checkIfOpen = false;

        scope.showChatBox = function() {
          alert("showChatBox");
          checkIfOpen = false;
          if (scope.course != course) {
            scope.isExited = false;
            courseGlobal = course;
            if(scope.course != undefined) {
              if (scope.course.messages != undefined) {
                  scope.course.messages = undefined;
              }
              scope.course = undefined;
            }

            //slack connection depending on course
            scope.course = "";
            scope.course = course;
            scope.courseSelected = true;
            $interval.cancel(gmPromise);
            gmPromise = $interval(gm, 1000);
          }
        }

        scope.$root.$on('finishedGetMessages', function(){
          if(checkIfOpen == false){
            $timeout(function () {
              $(".windowcont-slackbox").animate({ scrollTop: $('.windowcont-slackbox')[0].scrollHeight}, 800);
            }, 10);
          }
          checkIfOpen = true;
        });

        var gm = function(){
          getMessages(courseGlobal.code, savedUser.email, function(messages){
            scope.course.messages = "";
            if(messages == "not_authed"){
              scope.course.messages = [{ text:
                "Please Authenticate your profile with slack in your profile!"}];
              $interval.cancel(gmPromise);
            } else{
              scope.course.messages = messages;
              if(checkIfOpen == false){
                scope.$root.$broadcast('finishedGetMessages');
              }
            }
          });
        }

        scope.sendM = function(){
          sendMessage(scope.course.code, scope.input, savedUser.email,function(messages){
            scope.course.messages = "";
            scope.course.messages = messages;
            $(".windowcont-slackbox").animate({ scrollTop: $('.windowcont-slackbox')[0].scrollHeight}, 800);
          });
          scope.input = "";
        }

        SessionService.getSession().success(function(response) {
          User.get({_id: response.user._id, _populate: "courses"}, function(user){
            var coursesWithToken = [];

            console.log(user[0]);

            for (var i = 0; i < user[0].courses.length; i++) {
              if(user[0].courses[i].slack_channels != 0){
                coursesWithToken.push(user[0].courses[i]);
              }
            }

            scope.courselist = coursesWithToken;
            savedUser = user[0];
          });
        });

        scope.toggleCreateSlackBar = function() {
          console.log("toggleCreateSlackBar");
          alert("toggleCreateSlackBar");
          scope.isToolbarPersonalOpen = false;
          scope.isToolbarCreateSlackOpen = scope.isToolbarCreateSlackOpen === true ? false: true;
            scope.courseSelected = false;
            scope.isExited = false;
            console.log(scope.isExited);

      };

      scope.toggleCloseChatBox = function() {
        scope.isExited = true;
        $interval.cancel(gmPromise);
        scope.course = "";
      };

        scope.toggleCreateSlackBar = function() {
          $interval.cancel(gmPromise);
          scope.course = "";
          scope.isToolbarPersonalOpen = false;
          scope.isToolbarCreateSlackOpen = scope.isToolbarCreateSlackOpen === true ? false: true;
          scope.courseSelected = false;
        }
      }
    }
  }
]);
