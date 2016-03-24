app.directive('headerNav', [
  "settings",
  function(
    settings
  ) {

    return {
      templateUrl: settings.widgets + 'header/nav.html',
      replace: true,
      link: function(scope, element, attrs) {
       
       //logic
       
      }
    };
  }
]);