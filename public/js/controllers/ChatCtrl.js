// public/js/controllers/ChatCtrl.js
angular.module('ChatCtrl', []).controller('ChatController', function($scope, Chat) {
		
    // Sends message to Slack
    $scope.sendMessage = function() {

        // Asks ChatService
        Chat.sendMessage("oliver", $scope.text).success(function(response){
	        
	        Chat.getMessage("C0RRZEDK4").success(function(response){
            	$scope.channel = [];
				$scope.channel = response.messages;
				console.log($scope.channel);
        	});

            $scope.chat = response;
            console.log(response);
        });
    }


	//TODO: Use push method for the list instead of reloading after sent msg
    $scope.getMessage = function() {

                        //!!!CHANNEL AS HARDCODED STRING!!!!
        Chat.getMessage("C0RRZEDK4").success(function(response){
            $scope.channel = [];
            $scope.channel = response.messages;
            console.log($scope.channel);
        });
    }
});