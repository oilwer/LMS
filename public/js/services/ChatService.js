// public/js/services/ProfileService.js
angular.module('ChatService', []).factory('Chat', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function(username, text) {

		
            return $http.get('/api/chat?username=' + username + '&text=' + text);
        },
        
         test : function() {

            return $http.get('/api/getchatmsg');
        }
        
    }       

}]);