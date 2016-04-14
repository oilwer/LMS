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


        User.get({_id: scope.message.creator}, function(result){
          scope.creator = result[0].first_name + " " + result[0].last_name;
        });
                  
      }
    };
  }
]);

