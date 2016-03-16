// public/js/controllers/ModelAnythingCtrl.js
angular.module('ModelAnythingCtrl', []).controller('ModelAnythingController', function($scope, $sce, $timeout, ModelAnything, $compile) {
	

	var config = [];
	
	var derpFunc = function(){
		
		ModelAnything.fetchConfigFileFromSession().success(function(response){

			console.log("test");
			$scope.response = $sce.trustAsHtml(response);
            config = response;
            console.log(response);
            
            $scope.html = response;
	
			$scope.click = function(arg) {
			alert('Clicked ' + arg);
  			}

            
            // console.log(response);
           // var template = response;
            
            // $compile(response)($scope);
            
            
    });
		
	}
	
	$scope.response = derpFunc();  
	
	      
});