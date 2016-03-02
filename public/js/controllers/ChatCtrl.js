// public/js/controllers/ChatCtrl.js
angular.module('ChatCtrl', []).controller('ChatController', function($scope, Chat) {
		
		// Gui function send message
		$scope.sendMessage = function() {
			
			// Asks chat service 
			Chat.sendMessage("oliver", $scope.text)
			.success(function(response) {
				
				$scope.chat = response;
			});
		}
		
		// WIP
		$scope.fetchMsg = function() {
			Chat.test()
			.success(function(response) {
				$scope.channel.push(response);
			});
		}
});