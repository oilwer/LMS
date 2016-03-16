// public/js/services/ModelAnythingService.js

angular.module('ModelAnythingService', []).factory('ModelAnything', ['$http', function($http) {
	

    return {

        readConfigFile : function() {
	        	return $http.get('/readconfig/');
        },
        
        fetchConfigFileFromSession : function() {
	        	return $http.get('/fetchconfigfile/');
        }
    }
}]);