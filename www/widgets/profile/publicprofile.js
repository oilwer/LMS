app.directive('profilePublicprofile', [
  "settings",
  "User",
  "$routeParams",
  function(
    settings,
    User,
    $routeParams ) {
    return {
      templateUrl: settings.widgets + 'profile/publicprofile.html',
      link: function($scope, element, attrs) {
        User.get({ public_url: $routeParams.url }, function(res){
          var data = res[0];
          if(data != false) {
            $scope.first_name = data.first_name;
            $scope.last_name = data.last_name;
            $scope.email = data.email;
            $scope.phone_number = data.phone_number;
            $scope.url = data.public_url;
            $scope.description = data.description;
            $scope.homepage = data.homepage;
            $scope.linkedin = data.linkedin;
            $scope.facebook = data.facebook;
            $scope.twitter = data.twitter;
            $scope.github = data.github;
            $scope.user = data;
            obj = data;
            $scope.role = data.role;
            $scope.personality = data.personality;
          }else {
              $scope.first_name = "No profile found";
          }
        });           
      } 
    };
  }
]);