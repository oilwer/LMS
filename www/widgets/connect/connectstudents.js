app.directive('connectConnectstudents', [
  "settings",
  "User",
  function(
    settings,
    User
  ) {
	  
    return {
      templateUrl: settings.widgets + 'connect/connectstudents.html',
      link: function(scope, element, attrs) {
	  		
	      console.log("Page loaded :)");
          


      }
    };
  }
]);