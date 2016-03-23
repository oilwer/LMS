app.directive('modelanythingPlug', [
  "settings",
  function(
    settings
  ) {

    return {
      templateUrl: settings.widgets + 'modelanything/plug.html',
      replace: true,
      link: function(scope, element, attrs) {
        // make elements fade in when added to DOM 
        element.hide();
        element.fadeIn(300);
      }
    };
  }
]);