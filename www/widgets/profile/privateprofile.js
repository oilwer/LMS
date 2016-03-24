app.directive('profilePrivateprofile', [
  "settings",
  "User",
  "SessionService",
  function(
    settings,
    User,
    SessionService
     ) {

    return {
      templateUrl: settings.widgets + 'profile/privateprofile.html',
      link: function($scope, element, attrs) {
      		 
      		//Controlls that switches input
		    $scope.descriptionEnabled = true;
		    $scope.contactEnabled = true;
		    $scope.linksEnabled = true;
		    $scope.class = "fa fa-pencil";
		    $scope.contact_class = "fa fa-pencil";
		    $scope.links_class = "fa fa-pencil";
		    $scope.isStudent = false;
		    $scope.homepage = "http://www.myhomepage.com";
		    var obj = null;


		    var getUser = function () {

 				SessionService.getSession().success(function(response) {
 					
 					fetchedUser = response.user;

	 				if( (fetchedUser._id !== "") && (fetchedUser._id !== null))	{
						initializeProfile(fetchedUser);
					} else {
						return false;
					}	
	 				
				}); 
		    }

		    // Get profile data from DB
		    var initializeProfile = function (data) {
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
		            
		            if(data.role == "Student")
		                {
		                    $scope.isStudent = true;
		                }
		            $scope.personality = data.personality;

		        } else {
		            $scope.first_name = "No profile found";
		        }
		    };
			
			getUser();


		    $scope.editDescription = function () {
		        if ($scope.class == "fa fa-pencil") {
		            $scope.class = "fa fa-check"
		            $scope.descriptionEnabled = false;
		        } else {
		            obj.description = $scope.description;
		            $scope.updateProfile(obj);
		            $scope.descriptionEnabled = true;
		            $scope.class = "fa fa-pencil"
		        }
		    };
		    
		    $scope.editContact = function () {
		        if ($scope.contact_class == "fa fa-pencil") {
		            $scope.contact_class = "fa fa-check"
		            $scope.contactEnabled = false;
		        } else {
		            obj.phone_number = $scope.phone_number;
		            obj.public_url = $scope.url;
		            $scope.updateProfile(obj);
		            $scope.contactEnabled = true;
		            $scope.contact_class = "fa fa-pencil"
		        }
		    };
		    
		    $scope.editLinks = function () {
		        if ($scope.links_class == "fa fa-pencil") {
		            $scope.links_class = "fa fa-check"
		            $scope.linksEnabled = false;
		        } else {
		            $scope.updateProfile(obj);
		            $scope.linksEnabled = true;
		            $scope.links_class = "fa fa-pencil"
		        }
		    };


		    //Gui function update profile
		    $scope.updateProfile = function (obj) {
		        //Asks UserService to update User
		        var user = obj;

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

		        if(user != null){	        	
		            $scope.user = user;
		        }
		    };
      }
    };
  }
]);