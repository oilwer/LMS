app.directive('headerNav', [
  "settings",
  "SessionService",
    "$location",
     "LoginService",
    "$document",
    "$window",
  function(
    settings,
    SessionService,
     $location,
     LoginService,
     $document,
     $window
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

        scope.notifs = [{ url: "/chat", title: "Test1", text: "tessttext" },
        {url: "/chat", title: "Test1", text: "tessttext"},
        {url: "/chat", title: "Test1", text: "tessttext"}];

        SessionService.getSession().success(function(response) {

            //show hide create activites
          if(response.user.role == "admin" || response.user.role == "teacher"){
            scope.buttonDisplay = true;
          }

          //Todo, do a get by ID instead of using data from a session
          fetchedUser = response.user;
          if( (fetchedUser._id !== "") && (fetchedUser._id !== null)) {
            showPictureNav(fetchedUser);
              if(response.user.role != "admin"){
                scope.notifs = fetchedUser.notifications;
              }
              //scope.notf_number = fetchedUser.notifications.length;
              scope.notf_number = 12;
              scope.first_name = fetchedUser.first_name;
              scope.last_name = fetchedUser.last_name;
          } else {
            return false
          }
        });

        showPictureNav = function(user){
            var pic = ""
            if(user.profile_pic === undefined || user.profile_pic === ""){
              pic = "/img/profile_default.png";
            }else{
              pic = './uploads/' + user.profile_pic;
            }

            $(('.profileitem')).css({
              'background' : 'url('+ pic + ')',
              '-webkit-background-size': 'contain',
              '-moz-background-size': 'contain',
              '-o-background-size': 'contain',
              'background-size': 'contain'
            })
        }


        scope.pathLocation = function(newLocation) {
            $location.path(newLocation);
        }

        // Logout function
        scope.logout = function()
        {
	        LoginService.logout().success(function(response) {
		        	$window.location.href = '/login';
		        });
        }


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
            //fix for toolbar toggle, element event don't fire on modalshow()
            scope.isToolbarPersonalOpen = false;
            scope.isToolbarCreateOpen = false;
          };

        //show hide modal create resource
        scope.resourceModalShown = false;
        scope.toggleResourceModal = function() {
            scope.resourceModalShown = !scope.resourceModalShown;
            //fix for toolbar toggle, element event don't fire on modalshow()
            scope.isToolbarPersonalOpen = false;
            scope.isToolbarCreateOpen = false;
          };

        scope.$root.$on('showTheAssignmentModal', function() {
            scope.toggleAssignmentModal();
        });

        scope.$root.$on('showTheCourseModal', function() {
            scope.toggleModal();
        });

        scope.$root.$on('showTheResourceModal', function() {
            scope.toggleResourceModal();
        });


        //toolbar show hide on element click event
        scope.toggleCreateBar = function() {
            scope.isToolbarPersonalOpen = false;
            scope.isToolbarCreateOpen = scope.isToolbarCreateOpen === true ? false: true;

        };

        scope.togglePersonalBar = function() {
            scope.isToolbarCreateOpen = false;
            scope.isToolbarPersonalOpen = scope.isToolbarPersonalOpen === true ? false: true;
        };

          //close if click outside content
        element.bind('click', function(event) {
            event.stopPropagation();
        });

        $document.bind('click', function(){
            scope.isToolbarPersonalOpen = false;
            scope.isToolbarCreateOpen = false;
            scope.$apply();
        });

        //TODO: There should be a function that does all this hiding of drop
        //downs and stuff instead of doing it in each one
        scope.toggleNotificationBar = function() {
          scope.isToolbarCreateOpen = false;
          scope.isToolbarNotificationOpen = scope.isToolbarNotificationOpen === true ? false: true;
        }


      } //link

    };
  }
]);
