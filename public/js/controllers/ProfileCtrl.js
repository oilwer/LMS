// public/js/controllers/ProfileCtrl.js
angular.module('ProfileCtrl', []).controller('ProfileController', function($scope, Profile) {

	Profile.get("oliver")
					.success(function(data) {
						if(data != false)
						{
							$scope.first_name = data.first_name;
							
						}
						
						else 
						{
							$scope.first_name = "No profile found";
						}
					});
});