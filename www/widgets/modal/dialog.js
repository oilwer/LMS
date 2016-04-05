app.directive('modalDialog', [
  "settings",
  "SessionService",
    "$location",
  function(
    settings,
    SessionService,
     $location
  ) {

    return {
      templateUrl: settings.widgets + 'modal/dialog.html',
      replace: true,
      transclude: true,
    scope: {
      show: '='
    },
      link: function(scope, element, attrs) {
      
          scope.dialogStyle = {};
          if (attrs.width)
            scope.dialogStyle.width = attrs.width;
          if (attrs.height)
            scope.dialogStyle.height = attrs.height;
          scope.hideModal = function() {
            scope.show = false;
              console.log("hideModal körs");
          };
          
          
          
          
      }//end link
    };
  }
]);