app.directive('headerNav', [
  "settings",
  "SessionService",
    "$location",
  function(
    settings,
    SessionService,
     $location
  ) {

    return {
      templateUrl: settings.widgets + 'header/nav.html',
      replace: true,
      link: function(scope, element, attrs) {
       
        scope.isActive = function(route) {
            var theLocation = $location.path().split("/")[1];
            //fix if location.path() is root
            if (theLocation === "") {
                theLocation = "/";
            } else {
                theLocation = "/" + theLocation + "/";
            };
            return route === theLocation;
        }

        SessionService.getSession().success(function(response) {
            
            //show hide create activites
          if(response.user.role == "admin" || response.user.role == "teacher"){
            scope.buttonDisplay = true;
          }
            
          //Todo, do a get by ID instead of using data from a session
          fetchedUser = response.user;

          if( (fetchedUser._id !== "") && (fetchedUser._id !== null)) {

              scope.first_name = fetchedUser.first_name;
              scope.last_name = fetchedUser.last_name;
          } else {
            return false
          }
        });
          
          
        //show hide modal create course
        scope.modalShown = false;
          
        scope.toggleModal = function() {
            scope.modalShown = !scope.modalShown;
          };
          
        //show hide modal create assignment
        scope.assignmentModalShown = false;
        scope.toggleAssignmentModal = function() { 
            console.log("körs");
            scope.assignmentModalShown = !scope.assignmentModalShown;
          };

      } //link
    };
  }
]);