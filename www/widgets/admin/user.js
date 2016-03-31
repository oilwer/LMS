app.directive('adminUser', [
  "settings",
  "User",
  function(
    settings,
    User  ) {

    return {
      templateUrl: settings.widgets + 'admin/user.html',
      link: function($scope, element, attrs) {

        $scope.btnAddOrUpdateTextUser = 'Add user';
        
        // Updates the GUI according to edit/add-state
        var isEditing = false;

         //Function that refreshes list from DB
        var refresh = function(){
          $scope.userlist = User.get();
        };
        
        //Runs on page update
        refresh();

        //Gui function add user
        $scope.addOrUpdateUser = function() {

            // TODO: Check if not empty - FIX IN MOONGOSE
             
              // If it's not editing
              if(!isEditing){
                  var user = $scope.user;
                  //Asks the UserService to add a user
                  User.create({
                      profilePic: user.profilePic,
                      email: user.email,
                      first_name: user.first_name,
                      last_name: user.last_name,
                      description: user.description,
                      personality: user.personality,
                      phone_number: user.phone_number,
                      password: user.password,
                      public_url: user.public_url,
                      dashboard_config:[{
                          plug:{
                              id: user.id,
                              name: user.name,
                              path: user.path,
                              isActive: user.Boolean,
                              x: user.x,
                              y: user.y
                          }
                      }],
                      role: user.role //student/admin/teacher
                  });

                    // Pushes (updates) the GUI with the new user
                  $scope.userlist.push(user);
                  $scope.user = "";
                  user = null;
              }
              
              // If editing 
              else {

                $scope.btnAddOrUpdateTextUser = 'Add user';
                var user = $scope.user;
                //Asks UserService to update User
                User.update({
                    //searchObject
                    _id: user._id
                },{
                  //properties
                      profilePic: user.profilePic,
                      email: user.email,
                      first_name: user.first_name,
                      last_name: user.last_name,
                      description: user.description,
                      personality: user.personality,
                      phone_number: user.phone_number,
                      password: user.password,
                      public_url: user.public_url,
                        courses: {
                          course_name: user.course_name
                      },
                      dashboard_config:[{
                          plug:{
                              id: user.id,
                              name: user.name,
                              path: user.path,
                              isActive: user.Boolean,
                              x: user.x,
                              y: user.y
                          }
                      }],
                      role: user.role //student/admin/teacher
                  });
                // Refresh GUI
                refresh();
                $scope.user = "";
                isEditing = false;
              }
          };

          //Gui function remove user
          $scope.remove = function(targetUser){
            console.log("Removed: ", targetUser);
            $scope.user = "";
            $scope.btnAddOrUpdateTextUser = 'Add user';
          
            // removes user with a surtain id
            User.remove({_id: targetUser._id});
            refresh();
          };

          //Gui function fetch selected user data for editing
          $scope.prepareEdit = function (id){
              isEditing = true;
              $scope.btnAddOrUpdateTextUser = 'Update';
              //get info from db to put in the form boxes
              $scope.user = User.getById(id);
          };
      

      }
    };
  }
]);