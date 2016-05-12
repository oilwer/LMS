app.directive('breadcrumbsBreadcrumbs', [
  "settings",
  "$location",
  function(
    settings,
    $location
  ) {

    return {
      templateUrl: settings.widgets + 'breadcrumbs/breadcrumbs.html',
      link: function(scope, element, attrs) {

        //Breadcrumbs
        var locations = $location.path().split('/').splice(1);
        var locationspath = [];
          for (i = 0; i < locations.length; i++){
            if (i > 0){
              var somevar = "";
              for(x = i; x >= 0; x--){
                if(locations[i-x] != ""){
                  somevar += locations[i-x] + "/"
                }
              }
              locationspath.push(somevar);
            }
            else{
              locationspath.push(locations[i]);
            }
          }
          scope.locObj = {};

          for(i = 0; i < locations.length; i++){
              scope.locObj[locations[i]] = locationspath[i];
          }
        }
      }
    }
]);
