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

      //Create Channel Functions from scope, these call the proper methods
        scope.createSlackChannel = function(){
          createSlackChannelwithCourse("57177dc987bd6c6c0b797285", scope.channelName, scope.userEmail);
        }

        scope.joinChannel = function() {
          joinChannel(scope.channelName2, scope.userEmail);
        }

        scope.leaveChannel = function(){
          leaveChannel(scope.channelName2, scope.userEmail);
        }
        
        scope.sendMessage = function(){
          sendMessage(scope.channelName3, scope.text, scope.userEmail);
          var t = getMessages(scope.channelName3, scope.userEmail);
          console.log(t);
        }

      //Channel functions as vars, use these to do slack API and DB stuff,
      //Try to avoid as much as possible to put scope stuff in them to maintain
      //ReUsability

        //This method creates a  slack channel via API and then creates a DB object 
        //of the channel anc connects it with a course
        var createSlackChannelwithCourse = function(courseId, channelName, UserIdentifier){
          ChatService.createChannel(channelName, UserIdentifier).success(function(slackChannel){
            console.log(slackChannel);
            if(slackChannel.error != null){
              return;
            }
            Channel.create({ name: channelName, channel_id: slackChannel.channel.id }, function(dbChannel){ 
              Course.get({ _id: courseId }, function(returnedCourse){ 
                Channel.update({_relate:{items:dbChannel, connected_course:returnedCourse }});
                Course.update({ _relate: {items: returnedCourse, slack_channels: dbChannel }});
              });
            });
          });
        }

        //Function to create channel in DB without a connection to a course, for example
        //some generic channel for the school, note it still creates a db object
        var createSlackChannelwithoutCourse = function(channelName, UserIdentifier) {
          ChatService.createChannel(channelName, UserIdentifier).success(function(response){
            Channel.create({name: response.channel.name,channel_id: response.channel.id});
          });
        }

        var joinChannel = function(channelName, UserIdentifier){
          ChatService.joinChannel(channelName, UserIdentifier).success(function(response){
            console.log("Response", response);
          });
        }

        var leaveChannel = function(channelName, UserIdentifier){
          Channel.get({name: scope.channelName}, function(returnedChannel){
            ChatService.leaveChannel(returnedChannel[0].channel_id, UserIdentifier).success(function(response){  
              console.log("Response", response);
            });  
          });
        }

      //Functions with messages
        var sendMessage = function(channelName, text, UserIdentifier){
          Channel.get({name: channelName}, function(returnedChannel){
            if(returnedChannel[0] == null){
              console.log(returnedChannel);
              return;
            }
            ChatService.sendMessage(returnedChannel[0].channel_id, text, UserIdentifier).success(function(response){
              console.log("Response", response);
            });
          });
        }

        //This one is weird because you need to put the scope in the callBack
        var getMessages = function(channelName, UserIdentifier){
          scope.messages = [];
          Channel.get({name: channelName}, function(returnedChannel){
            if(returnedChannel[0] == null){
              console.log(returnedChannel);
              return;
            }
            console.log(UserIdentifier, returnedChannel[0].channel_id);
            ChatService.getMessage(returnedChannel[0].channel_id, UserIdentifier).success(function(response){
              console.log("Response", response);
              //scope.channel = response.messages;
              return response.messagess;
            }); 
          });
        }     
      }
    }
  }
]);