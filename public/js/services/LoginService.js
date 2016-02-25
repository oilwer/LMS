// public/js/services/LoginService.js
angular.module('LoginService', []).factory('Login', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function(username, password) {
	        
	        // console.log(username + " " + password);
	        
            // Makes API call w/ username and password
            return $http.get('/api/login?username=' + username + '&password=' + password);
        },


		// http://localhost:8080/api/login?username=oliver&password=password

                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(nerdData) {
            return $http.post('/api/login', nerdData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/login/' + id);
        }
    }       

}]);