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
<<<<<<< HEAD

        User.get({_id: scope.message.creator}, function(result){
          scope.creator = result[0].first_name + " " + result[0].last_name;
=======
        
        User.getById(scope.message.creator, function(result){
          scope.creator = result.first_name + " " + result.last_name;
>>>>>>> kurssida_styling
        });
                  
      }
    };
  }
]);

