app.directive('modelanythingPluginsWeather', [
  "settings",
  function(
    settings
  ) {

    return {
      templateUrl: settings.widgets + 'modelanything/plugins/weather.html',
      replace: true,
      link: function(scope, element, attrs) {

      }
    };
  }
]);
