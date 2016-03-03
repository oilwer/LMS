angular.module('ProfilePublicService', []).factory('ProfilePublic', ['$http', function($http) {

    return {
        // Get user by ID
        getByURL : function(public_url) {
            console.log("ProfilePublicService: " + public_url);
            return $http.get('/api/public/user?url=' + public_url);
        }
    }
}]);
