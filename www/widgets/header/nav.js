app.directive('headerNav', [
  "settings",
  "SessionService",
  function(
    settings,
    SessionService
  ) {

    return {
      templateUrl: settings.widgets + 'header/nav.html',
      replace: true,
      link: function(scope, element, attrs) {
       
       //logic

        SessionService.getSession().success(function(response) {
          
          //Todo, do a get by ID instead of using data from a session
          fetchedUser = response.user;

          if( (fetchedUser._id !== "") && (fetchedUser._id !== null)) {

              scope.first_name = fetchedUser.first_name;
              scope.last_name = fetchedUser.last_name;

            
          } else {
            return false
          }

        });



       
      }
    };
  }
]);