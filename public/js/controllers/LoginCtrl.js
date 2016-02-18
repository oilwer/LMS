// public/js/controllers/LoginCtrl.js


angular.module('LoginCtrl', []).controller('LoginController', function($scope, $location, $http, Login) {
	
	var color = "white";
	$scope.style = function(red) {
          return { "background-color": color };
      };
	
	var redirectAfterLogin = function()
	{
		// Change URL & reload route
		$location.path('/nerds');
		
		/*
		$location.update_path('/nerds');
		
		// Reroute to "/nerds"	
		$route.reload();
		*/
	}
	
	var alertToCheck = function() {
					
				Login.get($scope.name, $scope.password)
					.success(function(data) {
						if(data == true)
						{
							console.log("Logged in");
							color = "green";
							setTimeout(redirectAfterLogin, 100);
							
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
			
			var checked = false;
			$scope.showMe = false;
			$scope.checkIfValid = function() {

				if(($scope.name != undefined) && ($scope.name !== "")){
					if(($scope.password != undefined) && ($scope.password !== "")){
						if(checked == true){
			        		$scope.cancel(alertToCheck());
							checked = false;
		        		}
		        
			        $scope.showMe = !$scope.showMe;
			        checked = setTimeout(alertToCheck, 300);
		        
				}
				}
		        
		    };
 
});