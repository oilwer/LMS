app.directive('loginLoginstart', [
  "settings",
  "User",
  "LoginService",
  "$location",
  "$window",
  function(
    settings,
    User,
    LoginService,
    $location,
    $window
    ) {

    return {
      templateUrl: settings.widgets + 'login/login.html',
      link: function(scope, element, attrs) {
          scope.errorMsg = "Enter your credentials";
	  	    scope.class = "login--error-hide"; //reset class
          
	  	scope.loginFunc = function () {
	  		scope.errorMsg = "Enter your credentials";
	  		scope.class = "login--error-hide"; //reset class
	  		
	  		LoginService.login(scope.email, scope.password).success(function(response){
		  		//console.log(response);
		  		if(response) {
                    $window.location.href = '/';
                } else {
                    scope.errorMsg = "Wrong email or password, please try again";
                    scope.class = "login--error-show"; //reset class
                };
	  		});
	  
		
		}
		
		scope.forgotPassword = function (){
			$window.location.href = '/forgotPassword';
		}
		

      }
    };
  }
]);






