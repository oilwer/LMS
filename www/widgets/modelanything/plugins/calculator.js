app.directive('modelanythingPluginsCalculator', [
  "settings",
  function(
    settings
  ) {

    return {
      templateUrl: settings.widgets + 'modelanything/plugins/calculator.html',
      replace: true,
      link: function(scope, element, attrs) {

      }
    };
  }
]);
