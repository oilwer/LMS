//app declaration and dependency injection
var app = angular.module("mongr", [
 "ngRoute",
 "ngResource",
 "ui.bootstrap",
 "ngFileUpload"
]);


app.service('LoginService', function($http) {

   return {
       // call to login
       login : function(email, password) {

            var data = {"email": email, "password": password};

           // Makes API call w/ email and password
          //  return $http.get('/api/login/{"email": email, "password": password};
            return $http.post("/api/login/", data).success(function(response, status) {
                // console.log(response);
            });
       },

       checkIfUserExists : function(email) {

            var data = '{email: ' + '"' + email + '"' + '}';
           // Makes API call w/ email
          //  return $http.get('/api/user/{"email": email};
            return $http.get("/api/user/" + data).success(function(status) {
                // console.log(response);
            });
       },

       logout : function() {
        return $http.delete("/api/login").success(function(status) {

        });
      },

       resetPassword : function(email) {

            var data = '{"email": ' + '"' + email + '"' + '}';
           // Makes API call w/ email
          //  return $http.get('/api/user/{"email": email};

          console.log("data", data);

            return $http.put("/api/resetpassword/", data).success(function(status) {
                // console.log(response);
            });
       }
   }

});

app.service('SessionService', function($http) {

    return {
        //get session if user is logged in
        getSession : function() {
            return $http.get("/api/session").success(function(response) {
                // console.log(response);
            });
        }
    }
});

// app.service('CourseService', function($http) {

//     return {
//         //get session if user is logged in
//         getActive : function() {
//             Boolean b = true;
//             var data = '{status: ' + '"' + b + '"' + '}';
//            // Makes API call w/ email
//            //  return $http.get('/api/user/{"email": email};

//            console.log("data", data);
//             return $http.get("/api/course/", data).success(function(response) {
//                 // console.log(response);
//             });
//         }
//     }
// });

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

       getChannels : function(userIdentifier) {

         return $http.get('/api/chat?action=getChannels&userIdentifier=' + userIdentifier);

       },

       // Send message
       sendMessage : function(channel, text, userIdentifier) {
           var data = {"channel": channel, "text": text, "userIdentifier" : userIdentifier};

           return $http.post('/api/chat', data).success(function(response, status){

           });
       },

       //get message history
       getMessages : function(channel, userIdentifier) {

           return $http.get('/api/chat?id=' + channel + "&action=getHistory" + "&userIdentifier=" + userIdentifier).success(function(response, status){
             //console.log(response);
           });
       },

       leaveChannel : function(channelID, userIdentifier){
            return $http.delete('/api/chat?id=' + channelID +  "&action=leave" + "&userIdentifier=" + userIdentifier).success(function(response, status){
              //console.log(response);
            });
        }
   }
});
