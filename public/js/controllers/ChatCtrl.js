// public/js/controllers/ChatCtrl.js
angular.module('ChatCtrl', []).controller('ChatController', function($scope, Chat) {
		
		$scope.sendMsg = function() {
			Chat.get("oliver", $scope.text)
			.success(function(data) {
				$scope.chat = data;
			});
		}
		
		$scope.fetchMsg = function() {
			Chat.test()
			.success(function(response) {
				$scope.channel.push(response);
			});
		}
});