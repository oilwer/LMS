// public/js/controllers/ProfilePublicCtrl.js
angular.module('ProfilePublicCtrl', []).controller('ProfilePublicController', function($scope, $routeParams, UserService, ProfilePublic, Profile) {

    var url = $routeParams.url

    ProfilePublic.getByURL(url).success(function(data) {
        if(data != false) {
            $scope.first_name = data.first_name;
            $scope.user = data;
        }else {
            $scope.first_name = "No profile found";
        }
    });
});
