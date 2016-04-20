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
          if(user == undefined)
          {
	          
	          $window.location.href = '/login';
          }
          
          
          
          else
          {	          
	          angular.element(document).ready(function()
	          {
		          scope.loggedin = true;
	          });
	          
	          if(user.role == "admin")
	          {
		          scope.auth = true;
	          }
	          
	          if(user.role == "student")
	          {
		          
		          if($window.location.href.indexOf("admin") > -1)
		          {
			          $window.location.href = '/';
		          }
	          }
          }
          
          
          
          
        });
		
			
		
		

      }
    };
  }
]);






