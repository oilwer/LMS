app.directive('loginChecklogin', [
  "settings",
  "User",
  "SessionService",
  "$location",
  "$window",
  function(
    settings,
    User,
    SessionService,
    $location,
    $window
    ) {

    return {
      link: function(scope, element, attrs) {

	  	SessionService.getSession().success(function(response){

          var user = response.user;
          console.log(user);
        });
		
			// $window.location.href = '/forgotPassword';
		
		

      }
    };
  }
]);






