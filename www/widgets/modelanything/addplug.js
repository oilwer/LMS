app.directive('modelanythingAddplug', [
  "settings",
  "$location",
  "Course",
  "SessionService",
  "User",
  function(
    settings,
    $location,
    Course,
    SessionService,
    User
  ) {

    return {
      templateUrl: settings.widgets + 'modelanything/addplug.html',
      link: function(scope, element, attrs) {
          
        scope.add = function(){
        	var p = document.getElementById("dropdown");

        	console.log(p);

        	SessionService.getSession().success(function(response) {
				User.update({
					_id:response.user._id
				},{
 					$push: {
	                  plugs:{
	                  	name: p.options[p.selectedIndex].value,
	                  	isActive : true
	                  }
 					}
				});
			});
        }
      }
    };
  }
]);