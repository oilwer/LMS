// public/js/services/ChatService.js
angular.module('ChatService', []).factory('Chat', ['$http', function($http) {

    return {
        
        // Send message
        sendMessage : function(username, text) {

            //" '?channel=' + " is used for non-object variables
            return $http.post('/api/chat?username=' + username + '&text=' + text);
        },

        //get latest message
         getMessage : function(channel) {

            //" '?channel=' + " is used for non-object variables
            return $http.get('/api/getchatmsg?channel=' + channel);
        }
    }
}]);