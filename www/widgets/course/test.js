app.directive('courseTest', [
  "settings",
  "Course",
  "$routeParams",
  function(
    settings,
    Course,
    $routeParams
  ) {

    return {
      templateUrl: settings.widgets + 'course/test.html',
      link: function(scope, element, attrs) {
        console.log($routeParams.id);
        Course.get({ name: $routeParams.id }, function(res){
          console.log(res[0]);
          scope.course = res[0];
        });

      //placeholder for all the users courses, get from db
     /* $scope.course = {
          name: "Web development",
          assignment: "Assignment 1",
          status: "active",
          url: "testcourse"
        }; */
          
       
      }
    };
  }
]);