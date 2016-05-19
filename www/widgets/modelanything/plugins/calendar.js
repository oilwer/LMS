app.directive('modelanythingPluginsCalendar', [
  "settings",
  function(
    settings
  ) {

    return {
      templateUrl: settings.widgets + 'modelanything/plugins/calendar.html',
      replace: true,
      link: function(scope, element, attrs) {

      }
    };
  }
]);
