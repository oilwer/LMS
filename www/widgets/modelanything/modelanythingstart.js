app.directive('modelanythingModelanythingstart', [
  "settings",
  "User",
  "SessionService",
  function(
    settings,
    User,
    SessionService
  ) {

    return {
      templateUrl: settings.widgets + 'modelanything/modelanythingstart.html',
      link: function(scope, element, attrs) {


        SessionService.getSession().success(function(response){
          //gets the users id from current sessions
          //console.log(response.user._id);
          var user = response.user;
          loadPlugs(user);
          //var user = User.getById('56fb84b7e5054020401557e1');
          //console.log(user._id);
        });


        var loadPlugs = function(user) {

  			  scope.html = "";
  			  // console.log(user);

         // console.log(user.plugs.length);
         var nr = 0;

  			  for(var i = 0; i < user.plugs.length; i++) {
  				  if(user.plugs[i].isActive == true){
  					  // Adds html to all plugins
  					     var plug = user.plugs[i].name;
  					     var id = user.plugs[i]._id;

                 if((i % 2) === 0){
                  console.log(i);
                  scope.html += "<div class='row'>";
                 }
  					  
  					     scope.html += "<div class='col-md-12' id='" + plug + id + "' ><" +
                               "modelanything-plugins-" + plug + "/></div>";

                if((i % 2) === 1){
                  scope.html += "</div>";
                  console.log(i);
                 }
              }
  			  }
  		      //scope.html = '<div class="col-xs-12" form-base>';
	      }

        scope.deletePlug = function(name){
          console.log(name);
          SessionService.getSession().success(function(response) {
              User.update({
                _id:response.user._id
              },{
                $pull: { 
                    plugs : { name: name }
                }
              });
          });
        }

	      // User.onQueueDone (loadPlugs);
  	      // console.log(kk);
      }
    };
  }
]);
