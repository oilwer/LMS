app.directive('headerNav', [
  "settings",
  "SessionService",
    "$location",
    "$document",
  function(
    settings,
    SessionService,
     $location,
     $document
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
            //fix for toolbar toggle, element event don't fire on modalshow()
            scope.isToolbarPersonalOpen = false;
            scope.isToolbarCreateOpen = false;
          };
          
        //show hide modal create assignment
        scope.assignmentModalShown = false;
        scope.toggleAssignmentModal = function() { 
            scope.assignmentModalShown = !scope.assignmentModalShown;
          };
        
        
        //toolbar show hide on element click event
        scope.toggleCreateBar = function() {
            scope.isToolbarPersonalOpen = false;
            scope.isToolbarCreateOpen = scope.isToolbarCreateOpen === true ? false: true;
        };

        scope.togglePersonalBar = function() {
            scope.isToolbarCreateOpen = false;
            scope.isToolbarPersonalOpen = scope.isToolbarPersonalOpen === true ? false: true;
        };

        element.bind('click', function(event) {
            event.stopPropagation();      
        });

        $document.bind('click', function(){
            scope.isToolbarPersonalOpen = false;
            scope.isToolbarCreateOpen = false;
            scope.$apply();
        });
          
      } //link
    };
  }
]);