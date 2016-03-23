app.directive('headerNav', [
  "settings",
  function(
    settings
  ) {

    return {
      templateUrl: settings.widgets + 'header/nav.html',
      replace: true,
      link: function(scope, element, attrs) {
        // a clock
        scope.showTime = function() {
          // shows how angular digests scope
          // only when user interacts with form
          // if done without interval (and $apply() ?)
          return new Date();
        };
      }
    };
  }
]);