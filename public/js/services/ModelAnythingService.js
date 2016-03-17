// public/js/services/ModelAnythingService.js

angular.module('ModelAnythingService', []).factory('ModelAnything', ['$http', function($http) {
	

    return {        
        fetchDashboardPlugsConfigFromSession : function() {
	        	return $http.get('/fetchconfig/');
        }
    }
}]);