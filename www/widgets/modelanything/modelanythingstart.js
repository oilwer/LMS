app.directive('modelanythingModelanythingstart', [
  "settings",
  "User",
  function(
    settings,
    User
  ) {
	  
    return {
      templateUrl: settings.widgets + 'modelanything/modelanythingstart.html',
      link: function(scope, element, attrs) {
	  		
	      var user = User.getById("56f2b53358d11554118b3697");
	      
		  var loadPlugs = function() {
			  
			  scope.html = "";
			  
			  for(var i = 0; i < user.plugs.length; i++) {
				  if(user.plugs[i].isActive == true){
					  // Adds html to all plugins
					  var plug = user.plugs[i].name;
					  console.log(plug);
					  scope.html += "<" + "modelanything-plugins-" + plug + "/>";
			  	  }
			  }
		      //scope.html = '<div class="col-xs-12" form-base>';
	      }
	      
	      User.onQueueDone (loadPlugs);
	      
	      // console.log(kk);

      }
    };
  }
]);

