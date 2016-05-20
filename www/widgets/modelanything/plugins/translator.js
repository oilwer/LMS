app.directive('modelanythingPluginsTranslator', [
  "settings",
  function(
    settings
  ) {

    return {
      templateUrl: settings.widgets + 'modelanything/plugins/translator.html',
      replace: true,
      link: function(scope, element, attrs) {

      }
    };
  }
]);
