// public/js/controllers/ChatCtrl.js
angular.module('ChatCtrl', []).controller('ChatController', function($scope, Chat) {
		
    // Sends message to Slack
    $scope.sendMessage = function() {

        // Asks ChatService
        Chat.sendMessage("oliver", $scope.text).success(function(response){
            $scope.chat = response;
            console.log(response);
        });
    }

    //gets channel chat history
    $scope.getMessage = function() {

                        //!!!CHANNEL AS HARDCODED STRING!!!!
        Chat.getMessage("C0RRZEDK4").success(function(response){
            $scope.channel = [];
            $scope.channel = response.messages;
            console.log($scope.channel);
        });
    }
});