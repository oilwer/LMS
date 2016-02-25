// public/js/controllers/ProfileCtrl.js
angular.module('ProfileCtrl', []).controller('ProfileController', function($scope, Profile) {

	Profile.get("oliver")
					.success(function(data) {
						if(data != false)
						{
							$scope.username = data;
							
						}
						
						else 
						{
							$scope.username = "No profile found";
						}
					});
});