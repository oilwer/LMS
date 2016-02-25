// public/js/controllers/userCtrl.js
angular.module('UserCtrl', []).controller('UserController', function($scope, $http, us) {

    $scope.update = 'Add user';
    var editTrigger = false;

     //Update list from node
    var refresh = function(){
        us.get().success(function(res){
            console.log("Got the new data, ty mannilyman");
            $scope.userlist = res;
            $scope.user = "";
        });
    };
    //Runs on page update
    refresh();

    //add user
    $scope.addUser = function() {
        if(!editTrigger){
            console.log("users: "+ $scope.user);
            //Show the response from backend
            us.post($scope.user).success(function(response){
                console.log(response);
                //refresh
                //refresh();
                $scope.userlist.push(response);
                $scope.user = "";
            });
        } else {
            console.log($scope.user._id);
            $scope.update = 'Add user';
            //send everything from form boex labeled user to server
            us.put($scope.user).success(function (response) {
               // $scope.userlist.remove(response);
                refresh();
                $scope.user = "";

            });
            editTrigger = false;
        }
    };

    //remove user
    $scope.remove = function(id){
      console.log("Removed: "+id);
        $scope.user = "";
        $scope.update = 'Add user';
         //show the result from the ndoe
        us.delete(id).success(function(response){
            //refresh
            refresh();
        });
    };

    //edit user
    $scope.edit = function (id){
        editTrigger = true;
        $scope.update = 'Update';
        //console.log("Editing: "+id);
        us.getbyId(id).success(function(response){
            //get info from db to put in the form boxes
           $scope.user = response;
        });
    };
});