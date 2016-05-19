app.directive('resourcesResourceitem', [
  "settings",
  "$routeParams",
  "Course",
  "Resource",
  function(
    settings,
    $routeParams,
    Course,
    Resource
  ) {

    return {
      templateUrl: settings.widgets + 'resources/resourceitem.html',
      link: function(scope, element, attrs) {
          var url = $routeParams.url;


        scope.resourceList = [];
        Course.get({ url: url}, function(course){
            console.log("resurser", course[0]);
          if(course[0].resources !== undefined){
            for (var i = 0; i < course[0].resources.length; i++) {
                //scope.resourceList.push(course[0].resources[i]);
                Resource.get({_id: course[0].resources[i]}, function(resource){
                    scope.resourceList.push(resource[0]);
                });
            }
          }
        });
      }
    };
  }
]);
