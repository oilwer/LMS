app.directive('modelanythingPluginsChat', [
  "settings",
  function(
    settings
  ) {

    return {
      templateUrl: settings.widgets + 'modelanything/plugins/chatview.html',
      replace: false,
      link: function(scope, element, attrs) {
        console.log("Slack module runs");
	      scope.description = "This is the slack chat module description";

      }
    };
  }
]);
 
