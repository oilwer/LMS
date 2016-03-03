// public/js/controllers/LoginCtrl.js


angular.module('LoginCtrl', []).controller('LoginController', function($scope, $location, $http, Login) {
	
	// Variable that controls the design of the fields
	var color = "white";
	
	// Updates the color in GUI (Style/Css)
	$scope.style = function(red) {
          return { "background-color": color };
      };

	// Function that triggers the API login call and manages GUI changes
	var loginFunc = function() {
					
		Login.get($scope.email, $scope.password).success(function(response) {
			
			// login successful
			if(response == true){
				color = "green";
				
				// Redirects to profile
				$location.path('/profile');
			}
			
			// Login failed
			else {
				color = "red";
				console.log("Tried to log in, did not work");
			}
    	});	
	}

	// Timer
	var timer;
	
	// Gui Function that fires on key event from GUI. 
	$scope.checkIfValid = function() {
		
		/* Resets the timer
		clearTimeout(timer);
		
		// Sets the timer to 0.4 sec and then checks against DB
		timer = setTimeout(runCheckIfVaild, 400);*/
        if(($scope.email != undefined) && ($scope.email !== "")){
			if(($scope.password != undefined) && ($scope.password !== "")){
	        	loginFunc();
			}
		}
	}
	
	/* Function to run username and password against DB
	var runCheckIfVaild = function() {

			
    };*/
});