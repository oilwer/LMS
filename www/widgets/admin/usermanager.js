app.directive('adminUsermanager', [
  "settings",
  "User",
  "$window",
  "$location",
  function(
    settings,
    User,
    $window,
    $location
  ) {


    return {
      templateUrl: settings.widgets + 'admin/usermanager.html',
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
                var plug = "";
                if($scope.user.role === "teacher"){
                  plug = [{name: "courselist", isActive:true},{name: "teacherpanel", isActive: true}];
                }
                else if($scope.user.role === "admin"){
                  plug =  [{name: "courselist", isActive:true},{name: "adminpanel", isActive: true}];
                }
                else{
                  plug =  [{name: "courselist", isActive:true}];
                }

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
                    role: user.role, //student/admin/teacher
                    plugs: plug                               
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
                  public_url: user.public_url,
                  role: user.role //student/admin/teacher
                });
              // Refresh GUI
              refresh();
              $scope.user = "";
              isEditing = false;
            }
          };

        $scope.remove = function(targetUser) {
          if ($window.confirm("Do you want to delete "+ targetUser.first_name)) {
            $scope.user = "";
            $scope.btnAddOrUpdateTextUser = 'Add user';

            // removes user with a surtain id
            User.remove({_id: targetUser._id});
            refresh();
          } else {
              refresh();
          }
        };

        //Gui function fetch selected user data for editing
        $scope.prepareEdit = function (id){
            isEditing = true;
            $scope.btnAddOrUpdateTextUser = 'Update';
            //get info from db to put in the form boxes
            User.get({_id: id}, function(user)
          {
            user[0].password = undefined;
            $scope.user = user[0];
          });
        }
      }
    }
  }
]);
