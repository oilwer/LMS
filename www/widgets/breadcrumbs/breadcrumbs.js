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
      scope.locations = $location.path().split('/').splice(1);
        scope.locationspath = [];
        for (i = 0; i < scope.locations.length; i++){
            if (i > 0){
                scope.locationspath.push(scope.locations[i-1] + "/" + scope.locations[i]);

            }
            else{
                scope.locationspath.push(scope.locations[i]);
            }                          
        }
         /* console.log("locations " + scope.locations);
          console.log("locationspath " + scope.locationspath);
          scope.locObj = {};
          scope.locObj.data = [];
          scope.locObj.value = [];
          for(i = 0; i < scope.locations.length; i++){
              scope.locObj.data[i] = scope.locations[i];
              scope.locObj.value[i] = scope.locationspath[i];
          }

          
      console.log("LocObj " + scope.locObj.data + scope.locObj.value)*/
      /*scope.firstLoc = loc[1];
      scope.secondLoc = loc[2];
      scope.firstLoc_view = loc[0].charAt(0).toUpperCase() + loc[0].slice(1);
      scope.secondLoc_view = loc[1].charAt(0).toUpperCase() + loc[1].slice(1);*/

       
    }
  }
}
]);