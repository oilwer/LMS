// public/js/services/UserService.js
angular.module('UserService', []).factory('UserService', ['$http', function($http) {

    return {
	    
        // Get user list
        getUserList : function() {
            return $http.get('/api/userlist/');
        },
        
        // Get user by ID
        getById : function(id) {
            return $http.get('/api/user?id=' + id);
        },
        
        // Update user by ID
        updateUser : function (user){
            return $http.put('/api/userlist/', user);
        },
        
        // Add user
        addUser : function(user) {
            return $http.post('/api/user/', user);
        },
        
        // Delete user by ID
        delete : function(id) {
            return $http.delete('/api/user?id=' + id);
        }
    }
}]);