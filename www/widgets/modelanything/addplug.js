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


           SessionService.getSession().success(function(response) {
              User.get({_id: response.user._id}, function(res){
                  if(res[0].role === "admin"){
                    console.log("true");
                    scope.admin = true;
                    scope.teacher = false;
                  }
                  else if(res[0].role === "teacher"){
                     scope.teacher = true;                    
                      scope.admin = false;
                  }
                  else{
                    scope.teacher = false;                    
                    scope.admin = false;
                  }
              });
            });

          
        scope.add = function(){
        	var p = document.getElementById("dropdown");

        	SessionService.getSession().success(function(response) {
              var double = false;

              User.get({_id: response.user._id}, function(res){
                for (var i = 0; i < res[0].plugs.length; i++) {
                  if(res[0].plugs[i].name === p.options[p.selectedIndex].value){
                    double = true;
                    break;
                  }
                };

                if(double === false){
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
                }
              });              
			    });
        }
      }
    };
  }
]);