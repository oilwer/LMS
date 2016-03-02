// public/js/services/ChatService.js
angular.module('ChatService', []).factory('Chat', ['$http', function($http) {

    return {
        
        // Send message
        sendMessage : function(username, text) {

		
            return $http.post('/api/chat?username=' + username + '&text=' + text);
        },
        
         test : function() {

            return $http.get('/api/getchatmsg');
        }
        
    }       

}]);