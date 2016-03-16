// public/js/controllers/ModelAnythingCtrl.js
angular.module('ModelAnythingCtrl', []).controller('ModelAnythingController', function($scope, ModelAnything) {
	

		// Asks the ModelAnythingService to fetch plugins
		ModelAnything.fetchDashboardPlugsConfigFromSession().success(function(response){

			// Sets the HTML div to be filled up w/ the plugins
            $scope.html = response;
   
    });
	
	
	      
});