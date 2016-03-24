app.directive('modelanythingPluginsTestplug', [
  "settings",
  function(
    settings
  ) {

    return {
      templateUrl: settings.widgets + 'modelanything/testplug.html',
      replace: true,
      link: function(scope, element, attrs) {
	      
	      scope.derp = "YOOOOLOOOO";

      }
    };
  }
]);