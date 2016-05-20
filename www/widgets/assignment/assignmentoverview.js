app.directive('assignmentAssignmentoverview', [
  "settings",
  "User",
  "$routeParams",
  "$location",
  "SessionService",
  "Course",
  function(
    settings,
    User,
    $routeParams,
    $location,
    SessionService,
    Course
    ) {
    return {
      templateUrl: settings.widgets + 'assignment/assignmentoverview.html',
      link: function(scope, element, attrs) {

          var session_user;
          var theLocation = $location.path().split("/")[2];
          console.log(theLocation);
          scope.course;

          var setupAssignments = function() {
              //scope.showAll = false;
              //theLocationPath = $location.path();
              //theLocation = theLocationPath.split("/");


                SessionService.getSession().success(function(response) {
                  scope.session_user = response.user;
                });
                
              getAllAssignments();

                
                //scope.courseFilter = [];


          }
          

            var getAllAssignments = function()
            {
                Course.get({url: theLocation, _populate:"assignments"}, function(course)
                {
                    scope.course = course[0];
                });
            }
            
        setupAssignments()
        scope.castTheAssignmentModal = function() {
          scope.$root.$broadcast('showTheAssignmentModal');
        };

        scope.$root.$on('refreshAssignmentList', function() {
            setupAssignments();
        });

        scope.updateLocation = function(resourceUrl) {
            resourceUrl = '/courses/' + scope.course.url + '/assignments/' + resourceUrl;
            try {
                $location.path(resourceUrl);
            } catch (e) {
                console.log(e);
            } finally {

            }
        }
      } //link
    };
  }
]);
