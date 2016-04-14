app.directive('slackChat', [
  "settings",
  "ChatService",
  "User",
  "SessionService",
  "Course",
  "$location",
  function(
    settings,
    ChatService,
    User,
    SessionService,
    Course,
    $location
  ) {

    return {
      templateUrl: settings.widgets + 'slack/chat.html',
      link: function(scope, element, attrs) {
           scope.htmlContent = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE9+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
           var t = $location.search();
           //console.log($location);
          var token = "";
          var slackChannelId = ""; 

          scope.createSlackChannel = function(){
            createSlackChannel(scope.channelName,"bannanas","12", "mails");
          }

          scope.leaveChannel = function(channelName){
            ChatService.leaveChannel(channelName).success(function(response){
              console.log(response);
            });
          }

          var createSlackChannel = function(channelName, CourseId, UserIdentifier) {
            //Api call to ceate here, then update DB
            ChatService.createChannel(channelName, UserIdentifier).success(function(response){
              console.log(response);
            });
            
            
          }

          var connectSlacktoCourse = function(courseId, channelName){
            //DB stuff here
            // Course.get({_id: CourseId}, function(course){
            //   Slack.update({
            //     team_id: "LMS" //Hard coded, need to get from config or something
            //   },{ $push: {
            //         channels:{
            //           name: channelName,
            //         }
            //       }
            //   })
            // })
          }

          var joinChannel = function(courseId, userToken){

          }

          var initializeSlack = function(){
            SessionService.getSession().success(function(response) {
              User.get({_id:response.user._id},function(user){
              token = user[0].slack_token;
              });
            });
          }
          initializeSlack();
           //sends message
          scope.sendMessage = function(){
              //console.log(scope.text);

              ChatService.sendMessage("C0RRZEDK4", scope.text).success(function(response){
                  //scope.getMessage(); //use this later as param response.channel
              });
          }

          //updates channel messages
          scope.getMessage = function(){
            var id =  "C0RRZEDK4"; 
             scope.messages = [];
              ChatService.getMessage(id).success(function(response){
                  console.log(response);
                  scope.channel = response.messages;
              });
          }

          scope.getLatestMessage = function (channelID){

              var time = Date.now();
              slack.api('channels.history', {
                  token:apiToken,
                  channel:channelID,
                  latest: time
                  }, function(err, response){
                      callback(null, response);
                  });
          }

          scope.getChannelList = function (callback){

              slack.api('channels.list', {
                  token:apiToken
              }, function(err, response){
                  callback(null, response);
              });
          }
      }
    };
  }
]);