app.directive('resourcesResourceitem', [
  "settings",
  "$routeParams",
  "Course",
  function(
    settings,
    $routeParams,
    Course
  ) {

    return {
      templateUrl: settings.widgets + 'resources/resourceitem.html',
      link: function(scope, element, attrs) {
          var url = $routeParams.url;

        // Get all courses by name from url, populate fills all the
        // connected assignments so we can get their data.
        // ng repeat with response of assignments
        var filename;
        Course.get({ name: url }, function(course){
            for (var i = 0; i < course[0].resources.length; i++) {
                scope.filename.push = course[0].resources[i].filename;
                scope.added.push = course[0].resources[i].uploaded_on;
            }


        });
      }
    };
  }
]);
