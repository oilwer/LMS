// public/js/controllers/ChatCtrl.js
angular.module('ChatCtrl', []).controller('ChatController', function($scope, Chat) {
		
    // Gui function send message
    $scope.sendMessage = function() {

        // Asks chat service
        Chat.sendMessage("oliver", $scope.text).success(function(response){
	        this.getMessage();
            $scope.chat = response;
            console.log(response);
        });
    }

    $scope.getMessage = function() {
        Chat.getMessage("C0RRZEDK4").success(function(response){
            $scope.channel = [];
            $scope.channel = response.messages;
            console.log($scope.channel);
        });
    }
});