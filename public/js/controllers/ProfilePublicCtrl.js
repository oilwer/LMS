// public/js/controllers/ProfilePublicCtrl.js
angular.module('ProfilePublicCtrl', []).controller('ProfilePublicController', function($scope, $routeParams, UserService, ProfilePublic, Profile) {

    var url = $routeParams.url

    ProfilePublic.getByURL(url).success(function(data) {
        if(data != false) {
            $scope.first_name = data.first_name;
            $scope.last_name = data.last_name;
            $scope.email = data.email;
            $scope.phone_number = data.phone_number;
            $scope.url = data.public_url;
            $scope.description = data.description;
            $scope.user = data;
            obj = data;
            $scope.role = data.role;
            $scope.personality = data.personality;
        }else {
            $scope.first_name = "No profile found";
        }
    });
});
