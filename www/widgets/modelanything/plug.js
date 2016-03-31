app.directive('modelanythingPlug', [
  "settings",
  function(
    settings
  ) {

    return {
      templateUrl: settings.widgets + 'modelanything/plug.html',
      replace: true,
      link: function(scope, element, attrs) {

      }
    };
  }
]);