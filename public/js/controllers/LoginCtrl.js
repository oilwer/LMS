// public/js/controllers/LoginCtrl.js


angular.module('LoginCtrl', []).controller('LoginController', function($scope, $location, $http, Login) {
	
	// Variable that resets error message
    $scope.errorMsg = "Enter your credentials";
    $scope.class ="login--hide"

	// Function that triggers the API login call and manages GUI changes
	$scope.loginFunc = function() {
        
        $scope.errorMsg = "Enter your credentials";
        $scope.class = "login--hide"; //reset class
					
		Login.get($scope.email, $scope.password).success(function(response) {
			
			// login successful
			if(response == true){

				// Redirects to profile
				$location.path('/profile');
			}
			
			// Login failed
			else {
                $scope.errorMsg = "Wrong email or password, please try again"; //update error message
                $scope.class = "login--show"; //show error message
				console.log("Tried to log in, did not work");
			}
    	});	
	};
    
    $scope.forgotPassword = function() {
        console.log("forgot password func, placeholder");

		//TODO: Alt1: Ask user for email and send new? password to email (for that user)
    }
});