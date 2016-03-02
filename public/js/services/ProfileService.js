// public/js/services/ProfileService.js
angular.module('ProfileService', []).factory('Profile', ['$http', function($http) {

    return {
        
        get : function() {
            return $http.get('/api/profile');
        },


		// http://localhost:8080/api/profile?email=oliver

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