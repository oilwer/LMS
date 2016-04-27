app.directive('slackChat', [
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
      templateUrl: settings.widgets + 'slack/chat.html',
      link: function(scope, element, attrs) {

        scope.getMessages = function(){
          $interval(listenMessages, 1000);
        }

        var listenMessages = function () {
          getMessages("everything", scope.userEmail, function(callback){
            scope.channels = callback;
          });
        }
        

      //Create Channel Functions from scope, these call the proper methods
        scope.createSlackChannel = function(){
          createSlackChannelwithCourse("57177dc987bd6c6c0b797285", scope.channelName, scope.userEmail);
        }

        scope.joinChannel = function(){
          joinChannel(scope.channelName2, scope.userEmail);
        }

        scope.leaveChannel = function(){
          leaveChannel(scope.channelName2, scope.userEmail);
        }

        scope.sendMessage = function(){
          sendMessage(scope.channelName3, scope.text, scope.userEmail, function(callback){
            scope.channels = callback;
          });
        }

        scope.getChannels = function(){
          getChannels(scope.userEmail);
        }

      //Channel functions as vars, use these to do slack API and DB stuff,
      //Try to avoid as much as possible to put scope stuff in them to maintain
      //ReUsability

        //This method creates a  slack channel via API and then updates the course
        //it needs to be connected to
        var createSlackChannelwithCourse = function(courseId, channelName, UserIdentifier){
          ChatService.createChannel(channelName, UserIdentifier).success(function(slackChannel){
            console.log(slackChannel);
            if(slackChannel.error != null){
              return;
            }

            ChatService.getChannels(UserIdentifier).success(function(channels){
              for(x = 0; x < channels.channels.length; x++){
                if(channels.channels[x].name == channelName){
                  Course.update({ _id : courseId } , {$push: { slack_channels: { channelId: test} } });
                  break;
                }
              }
            });
          });
        }

        //Function to create channel in DB without a connection to a course, for example
        //some generic channel for the school, note it still creates a db object
        var createSlackChannelwithoutCourse = function(channelName, UserIdentifier) {
          ChatService.createChannel(channelName, UserIdentifier).success(function(response){
            console.log("Response", response)
          });
        }

        var joinChannel = function(channelName, UserIdentifier){
          ChatService.joinChannel(channelName, UserIdentifier).success(function(response){
            console.log("Response", response);
          });
        }

        var leaveChannel = function(channelId, UserIdentifier){
          ChatService.leaveChannel(channelId, UserIdentifier).success(function(response){
            console.log("Response", response);
          });
        }

        var getChannels = function(UserIdentifier){
          ChatService.getChannels(UserIdentifier).success(function(response){
            console.log(response);
          });
        }

      //Functions with messages
        //Send message, has call back if you want to get messages directly after sending
        var sendMessage = function(channelName, text, UserIdentifier, callback){
          ChatService.getChannels(UserIdentifier).success(function(channels){
            if(channels.channels == null){
              return;
            }
            for(x = 0; x < channels.channels.length; x++){
              if(channels.channels[x].name == channelName){
                ChatService.sendMessage(channels.channels[x].id, text, UserIdentifier).success(function(response){
                  console.log("Response", response);
                  ChatService.getMessages(channels.channels[x].id, UserIdentifier).success(function(response){
                    console.log("Response", response);
                    callback(response.messages);
                    });
                });
                break;
              }
            }
          });
        }

        //Get messages with callback
        var getMessages = function(channelName, UserIdentifier, callback){
          scope.messages = [];

          ChatService.getChannels(UserIdentifier).success(function(channels){
            if(channels.channels == null){
              return;
            }
            for(x = 0; x < channels.channels.length; x++){
              if(channels.channels[x].name == channelName){
                ChatService.getMessages(channels.channels[x].id, UserIdentifier).success(function(response){
                  console.log("Response", response);
                  callback(response.messages);
                });
                break;
              }
            }
          });
        }
      }
    }
  }
]);
