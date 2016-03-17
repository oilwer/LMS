angular.module('TestplugCtrl', []).controller('TestplugController', function($scope) {
  var self = this;
  
  $scope.test = "Testplug.js";
  
  self.list = [
    {text: 'A sample plugin'},
    {text: 'for the modular dashboard'},
    {text: 'And this is another message'}
  ];
  
  self.clear = function() {
    self.list = [];
  };
});
