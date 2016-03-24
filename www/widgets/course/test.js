app.directive('courseTest', [
  "settings",
  function(
    settings
  ) {

    return {
      templateUrl: settings.widgets + 'course/test.html',
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