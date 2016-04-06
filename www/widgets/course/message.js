app.directive('courseMessage', [
  "settings",
  "User",
  function(
    settings,
    User
  ) {
    return {
      templateUrl: settings.widgets + 'course/message.html',
      link: function(scope, element, attrs) {
        element.hide();
        element.fadeIn(300);

        User.getById(scope.message.creator, function(result){
          scope.creator = result.first_name + " " + result.last_name;
        });
                  
      }
    };
  }
]);

