app.directive('forgotpasswordForgotpassword', [
  "settings",
  "LoginService",
  function(
    settings,
    LoginService
  ) {

    return {
      templateUrl: settings.widgets + 'forgotpassword/password.html',
      link: function(scope, element, attrs) {
	      
	      scope.resetPassword = function() {
        	LoginService.checkIfUserExists(scope.email).success(function(response){
		  		
		  		console.log(response);
		  		
		  		if(response.length == 1)
		  		{
			  		console.log("???");
			  		LoginService.resetPassword(response[0].email).success(function(response){
				  			console.log(response);
				  			
				  			if(response == "updated"){
				  				scope.formBoxHide = true;
				  				scope.resultMessage = true;
           					}
				  		});
			  		
		  		}
	  		});
    	  }
      }
    };
  }
]);