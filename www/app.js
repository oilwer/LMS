//app declaration and dependency injection
var app = angular.module("mongr", [
 "ngRoute",
 "ngResource",
 "ui.bootstrap"
]);

app.service('LoginService', function($http) {
     
   return {
       // call to get all nerds
       post : function(email, password) {
       
            var data = {"email": email, "password": password};

           // Makes API call w/ username and password
          //  return $http.get('/api/login?email=' + email + '&password=' + password);
            return $http.post("/api/login/", data).success(function(response, status) {
                console.log(response);            
            });        
       }
   }
});

app.service('ChatService', function($http){

	return {
        // Send message
        sendMessage : function(username, text) {
            var data = {"username": username, "text": text};
            //" '?channel=' + " is used for non-object variables
            return $http.post('/api/chat/', data).success(function(response, status){
            	console.log(response);
            });
        },

        //get message history
        getMessage : function(channel) {

            var data = '{channel: ' + '"' + channel + '"' + '}';
            console.log(data);
            //" '?channel=' + " is used for non-object variables
            return $http.get('/api/chat/' + data).success(function(response, status){
            	console.log(response);
            });
        }
    }
});