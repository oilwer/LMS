app.directive('adminSlack', [
  "settings",
  "Slack",
  function(
    settings,
    Slack  ) {

    return {
      templateUrl: settings.widgets + 'admin/user.html',
      link: function($scope, element, attrs) {        

        //Asks the UserService to add a user
        Slack.create({
          client_id: String,
          secret: String,
          team_id: String,
            channels:[{
              name: String,
              id: String,
              connected_course_id: String
            }],   
        });
      }
    };
  }
]);