//app declaration and dependency injection
app.service('ChatService', function($http){

 return {
       createChannel : function(channelName, userIdentifier) {
         var data = {"channelName" : channelName, "action" : "createChannel", "userIdentifier" : userIdentifier};

         return $http.post('/api/chat', data).success(function(response, status){

         });
       },

       joinChannel : function(channelName, userIdentifier) {
         var data = {"channelName" : channelName, "action" : "joinChannel", "userIdentifier" : userIdentifier};

         return $http.post('/api/chat', data).success(function(response, status){

         });
       },

       // Send message
       sendMessage : function(channel, text, userIdentifier) {
           var data = {"channel": channel, "text": text, "userIdentifier" : userIdentifier};

           return $http.post('/api/chat', data).success(function(response, status){
           
           });
       },

       //get message history
       getMessage : function(channel) {
           //console.log(data);
           //" '?channel=' + " is used for non-object variables
           return $http.get('/api/chat?id=' + channel).success(function(response, status){
             //console.log(response);
           });
       },

        leaveChannel : function(channel){
            var data = "leave";
            return $http.get('/api/chat?id=' + channel, action).success(function(response, status){
              //console.log(response);
            });
          
        }
   }
});
