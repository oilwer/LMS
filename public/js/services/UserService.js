/**
 * Created by simon on 2/24/16.
 */

// public/js/services/UserService.js
angular.module('UserService', []).factory('us', ['$http', function($http) {

    return {
        // call to get all users
        get : function() {
            return $http.get('/api/userlist');
        },
        //get one user by id
        getbyId : function(id) {
            return $http.get('/api/user/?id=' + id);
        },
        //Update user by id
        put : function (user){
            return $http.put('/api/userlist', user);
        },
        // call to POST and add a new user to the db
        post : function(user) {
            return $http.post('/api/userlist', user);
        },
        // call to DELETE a user by id
        delete : function(id) {
            return $http.delete('/api/userlist/?id=' + id);
        }
    }
}]);