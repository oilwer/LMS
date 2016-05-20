app.directive('modelanythingPluginsApk', [
  "settings",
  function(
    settings
  ) {

    return {
      templateUrl: settings.widgets + 'modelanything/plugins/apk.html',
      replace: false,
      link: function(scope, element, attrs) {
        console.log("does this run?");
      }
    };
  }
]);
