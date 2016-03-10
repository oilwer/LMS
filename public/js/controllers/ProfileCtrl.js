// public/js/controllers/ProfileCtrl.js
angular.module('ProfileCtrl', []).controller('ProfileController', function ($scope, Profile, UserService) {
    //Controlls that switches input
    $scope.editorEnabled = true;
    $scope.editorDisabled = false;
    $scope.class = "fa fa-pencil";
    var obj = null;

    // Get profile data from DB
    Profile.get().success(function (data) {
        if (data != false) {
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

        } else {
            $scope.first_name = "No profile found";
        }
    });


    $scope.enableEditor = function ($event) {
        if ($scope.class == "fa fa-pencil") {
            $scope.class = "fa fa-check"
            $scope.editorEnabled = false;
            $scope.editorDisabled = true;
        } else {
            var elem = $event.currentTarget
            

         
            obj.description = $scope.description;
            $scope.updateProfile(obj);

            $scope.disableEditor();
            $scope.class = "fa fa-pencil"
        }
    };

    $scope.disableEditor = function () {
        

        $scope.editorEnabled = true;
        $scope.editorDisabled = false;
    };

    //Gui function update profile
    $scope.updateProfile = function (obj) {
        //Asks UserService to update User
        UserService.updateUser(obj).success(function (response) {
            $scope.user = response;
        });
    };
});

