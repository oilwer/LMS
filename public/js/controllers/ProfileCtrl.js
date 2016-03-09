// public/js/controllers/ProfileCtrl.js
angular.module('ProfileCtrl', []).controller('ProfileController', function($scope, Profile, UserService) {

	// Get profile data from DB
	Profile.get().success(function(data) {

		if(data != false) {
			$scope.first_name = data.first_name;
            $scope.last_name = data.last_name;
            $scope.email = data.email;
            $scope.phone_number = data.phone_number;
            $scope.url = data.public_url;
            $scope.description = data.description;
			$scope.user = data;
			$scope.role = data.role;
            $scope.personality = data.personality;

		}else {
			$scope.first_name = "No profile found";
		}
	});

	//Gui function update profile
	$scope.updateProfile = function() {

		//Asks UserService to update User
		UserService.updateUser($scope.user).success(function (response) {
			console.log(response);
		});
	};
});