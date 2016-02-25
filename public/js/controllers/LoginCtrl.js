// public/js/controllers/LoginCtrl.js


angular.module('LoginCtrl', []).controller('LoginController', function($scope, $location, $http, Login) {
	
	var color = "white";
	$scope.style = function(red) {
          return { "background-color": color };
      };

	// Function that triggers the API call and manages GUI changes
	var alertToCheck = function() {
					
				Login.get($scope.email, $scope.password)
					.success(function(data) {
						if(data == true)
						{
							color = "green";
							$location.path('/profile');
							
						}
						
						else 
						{
							color = "red";
							console.log("Tried to log in, did not work");
							
						}

            		});	
						 				
				$scope.showMe = !$scope.showMe;
				return true;
			}

			// Timer
			var timeoutHandle;
			
			// Function gets trigged from GUI on change
			$scope.checkIfValid = function() {
				
				// Resets the timer
				clearTimeout(timeoutHandle);
				
				// Sets the timer to 0.4 sec and then checks againt DB
				timeoutHandle = setTimeout(runCheckIfVaild, 400);

				}
			
			// Function to run username and password againt DB
			var runCheckIfVaild = function() {

				if(($scope.email != undefined) && ($scope.email !== "")){
					if(($scope.password != undefined) && ($scope.password !== "")){
			        alertToCheck();
		        
				}
				}
				
		    };
 
});