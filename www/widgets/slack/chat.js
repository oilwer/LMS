app.directive('slackChat', [
  "settings",
  "ChatService",
  "User",
  "SessionService",
  "Course",
  "Channel",
  "$location",
  function(
    settings,
    ChatService,
    User,
    SessionService,
    Course,
    Channel,
    $location
  ) {

    return {
      templateUrl: settings.widgets + 'slack/chat.html',
      link: function(scope, element, attrs) {
           scope.htmlContent = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE9+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
           var t = $location.search();

          scope.createSlackChannel = function(){
            createSlackChannel(scope.channelName,"12", "mails");
          }

          scope.leaveChannel = function(){
            
            //get channel
            Channel.get({name: scope.channelName}, function(returnedChannel){
              //using returned channel's id, leave course
              ChatService.leaveChannel(returnedChannel[0].channel_id,"mails").success(function(response){  
                console.log("Response: " + response);
              });  
            })
          }

          var createSlackChannel = function(channelName, CourseId, UserIdentifier) {
            //Api call to ceate here, then update DB
            ChatService.createChannel(channelName, UserIdentifier).success(function(response){
              createChannelDB(response.channel.name, response.channel.id);
            });
          }

          var createChannelDBWithCourseID = function(courseId, channelName, channelID){
            //DB stuff here
            Channel.create(
              {
                name: channelName,
                channel_id: channelID,
                  //return value from Channel.Create
              }, function(createdChannel){ 

                Course.get({_id:courseId}, function(returnedCourse){ //return value from Course.get
                  //finds channel and creates relation to course via CourseId
                  Channel.update({_relate:{items:createdChannel,connected_course:returnedCourse}})
                });
              }
            );
          }

          var createChannelDB = function(channelName, channelID){
            Channel.create({name: channelName,channel_id: channelID});
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
          scope.sendMessage = function(courseName){
              //TODO:
              //use courseName to get the course from database
              //use course id to get channel id from database
              //replace hardcoded channel_id in ChatService.sendMessage() call
              
              SessionService.getSession().success(function(response) {
              	
              	
              	ChatService.sendMessage("C0RRZEDK4", scope.text, response.user.email).success(function(newresponse){
	              	console.log("Sent msg", response.user.email, scope.text);
	              	getMessage();
              	});
              	
            });

              
          }

          //updates channel messages
          var getMessage = function(){
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