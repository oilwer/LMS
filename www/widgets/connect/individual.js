app.directive('connectIndividual', [
  "settings",
  "User",
  function(
    settings,
    User
  ) {
    return {
      templateUrl: settings.widgets + 'connect/individual.html',
      link: function(scope, element, attrs) {
        element.hide();
        element.fadeIn(300);
      }
    };
  }
]);

