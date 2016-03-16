angular.module('TestplugCtrl', []).controller('TestplugController', function($scope) {
  var self = this;
  
  $scope.test = "hejhej";
  
  self.list = [
    {text: 'Hello, World! deerp'},
    {text: 'This is a message'},
    {text: 'And this is another message'}
  ];
  
  self.clear = function() {
    self.list = [];
  };
});
