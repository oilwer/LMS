// public/js/controllers/userCtrl.js
angular.module('UserCtrl', []).controller('UserController', function($scope, $http, UserService) {

    $scope.btnAddOrUpdateText = 'Add user';
    
    // Updates the GUI according to edit/add-state
    var isEditing = false;

     //Function that refreshes list from DB
    var refresh = function(){
	    
	    // Asks UserService for the Userlist
        UserService.getUserList().success(function(response){
            
            // Updates the gui with the userListData
            $scope.userlist = response;
            $scope.user = "";
        });
    };
    
    //Runs on page update
    refresh();

    //Gui function add user
    $scope.addOrUpdateUser = function() {
	    
	    // TODO: Check if not empty
       
        // If it's not editing
        if(!isEditing){

            //Asks the UserService to add a user
            UserService.addUser($scope.user).success(function(response){
                
                // Pushes (updates) the GUI with the new user
                $scope.userlist.push(response);
                $scope.user = "";
            });
            
        }
        
        // If editing 
        else {

            $scope.btnAddOrUpdateText = 'Add user';
         
            //Asks UserService to update User
            UserService.updateUser($scope.user).success(function (response) {

				// Refresh GUI
                refresh();
                $scope.user = "";

            });
            isEditing = false;
        }
    };

    //Gui function remove user
    $scope.remove = function(id){
      console.log("Removed: "+id);
        $scope.user = "";
        $scope.btnAddOrUpdateText = 'Add user';
         //show the result from the ndoe
        UserService.delete(id).success(function(response){
            //refresh
            refresh();
        });
    };

    //Gui function fetch selected user data for editing
    $scope.prepareEdit = function (id){
        isEditing = true;
        $scope.btnAddOrUpdateText = 'Update';

        UserService.getById(id).success(function(response){
            //get info from db to put in the form boxes
           $scope.user = response;
        });
    };
});