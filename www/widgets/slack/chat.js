app.directive('slackChat', [
  "settings",
  "ChatService",
  function(
    settings,
    ChatService
  ) {

    return {
      templateUrl: settings.widgets + 'slack/chat.html',
      link: function(scope, element, attrs) {
           
           //sends message
          scope.sendMessage = function(){
              //console.log(scope.text);

              ChatService.sendMessage("Oliwer", scope.text).success(function(response){
                  //console.log(response);
                  scope.getMessage(); //use this later as param response.channel
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