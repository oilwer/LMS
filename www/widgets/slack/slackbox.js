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
        var allUsers = User.get();

        scope.slackcourses = [];

        function findWithAttr(array, attr, value) {
          for(var i = 0; i < array.length; i += 1) {
            if(array[i] != undefined) {
              if(array[i][attr] === value) {
                  return i;
              }
            }
          }
        }

        var sendMessage = function(channelName, text, UserIdentifier, callback){
          var name = channelName;

          var obj = savedUser.courses.filter(function ( obj ) {
            return obj.code === name;
          })[0];

          ChatService.sendMessage(obj.slack_channels[0].channelId, text, UserIdentifier).success(function(response){
            callback();
          });
        }

        //Get messages with callback
        var getMessages = function(course, channelName, UserIdentifier, callback){
          var indexOfCurrentCourse = findWithAttr(scope.slackcourses, "_id", course._id);

          if(scope.slackcourses[indexOfCurrentCourse].messages == undefined) scope.slackcourses[indexOfCurrentCourse].messages = [];

          var name = channelName;
          var obj = savedUser.courses.filter(function ( obj ) {
            return obj.code === name;
          })[0];

          ChatService.getMessages(obj.slack_channels[0].channelId, UserIdentifier).success(function(response){
            if(response.error == "not_authed"){
              callback(response.error);
            } else {
              for (var i = 0; i < response.messages.length; i++) {
                var slack_username = response.messages[i].user;

                var obj = allUsers.filter(function ( obj ) {
                  return obj.slack_username === slack_username;
                })[0];

                if(obj != undefined) {
                  if(typeof obj.subtype === 'undefined') {
                    var slack_name = obj.first_name + " " + obj.last_name;
                    response.messages[i].user=slack_name;
                  }
                }
                else {
                  if(response.messages[i].subtype !== 'undefined') {
                    response.messages.splice(i, 1);
                  }
                }
              }
              callback(response.messages.reverse());
            }
          });
        }

        var courseGlobal;
        var gmPromises = [];
        var counter = 0;

        scope.showChatBox = function(course) {
          if (findWithAttr(scope.slackcourses, "_id", course._id) == undefined) {
            course.isOpen = true;
            scope.slackcourses.push(course);

            var gmPromise = $interval(function(){
              gm(course);
            }, 1000);

            gmPromises[findWithAttr(scope.slackcourses, "_id", course._id)] = gmPromise;
          }
        }

        var gm = function(course){
          getMessages(course, course.code, savedUser.email, function(messages) {
            var indexOfCurrentCourse = findWithAttr(scope.slackcourses, "_id", course._id);

            scope.slackcourses[indexOfCurrentCourse].messages = "";
            if(messages == "not_authed"){
              scope.slackcourses[indexOfCurrentCourse].messages = [{ text:
                "Please Authenticate your profile with slack in your profile!"}];
              $interval.cancel(gmPromises[indexOfCurrentCourse]);
            } else{
              scope.slackcourses[indexOfCurrentCourse].messages = messages;

              // TODO: Fix the bottom scroll when messaages have loaded (look at old code?)
             //  $(".windowcont-slackbox").animate({ scrollTop: $('.windowcont-slackbox')[0].scrollHeight}, 800);
            }
          });
        }


        scope.sendM = function(course){
          sendMessage(course.code, course.input, savedUser.email,function(messages){
            course.input = "";
            var indexOfCurrentCourse = findWithAttr(scope.slackcourses, "_id", course._id);
            $(".windowcont-slackbox").animate({ scrollTop: $('.windowcont-slackbox')[0].scrollHeight}, 800);
          });
        }

        SessionService.getSession().success(function(response) {
          User.get({_id: response.user._id, _populate: "courses"}, function(user){
            var coursesWithToken = [];
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
          alert("toggleCreateSlackBar");
          scope.isToolbarPersonalOpen = false;
          scope.isToolbarCreateSlackOpen = scope.isToolbarCreateSlackOpen === true ? false: true;
          scope.courseSelected = false;
          scope.isExited = false;
        };

        scope.toggleCloseChatBox = function(course) {
          var indexOfCurrentCourse = findWithAttr(scope.slackcourses, "_id", course._id);
          $interval.cancel(gmPromises[indexOfCurrentCourse]);
          course.isOpen = false;
          scope.slackcourses[indexOfCurrentCourse] = undefined;
        };

        scope.toggleCreateSlackBar = function() {
          scope.course = "";
          scope.isToolbarPersonalOpen = false;
          scope.isToolbarCreateSlackOpen = scope.isToolbarCreateSlackOpen === true ? false: true;
          scope.courseSelected = false;
        }
      }
    }
  }
]);
