app.directive('profilePrivateprofile', [
  "settings",
  "User",
  "SessionService",
  "$routeParams",
  "$location",
  "$http",
  function(
    settings,
    User,
    SessionService,
    $routeParams,
    $location,
    $http
     ) {

    return {
      templateUrl: settings.widgets + 'profile/privateprofile.html',
      link: function($scope, element, attrs) {

  		var redirectSuccess = function(){
	    	var code = $location.search().code; //slack code returned in url if auth success
	    	if(code != undefined){

	    		//Name of the slackTeam changes for each company using LMS, for example
	    		//the following means the user will be connected to lmsproject.slack.com
	    		var slackTeam = "lmsproject"
	    		//url contains a special temporary code needed for aquaring user token
	    		var url = "https://slack.com/api/oauth.access?client_id=19435876323.23240924768&client_secret=e6a4a2f97a72b6a1e889830b6ba7612b&code=" + code + "&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fmyprofile%2F&pretty=1&team=" + slackTeam;

	    		//uses temp code to get access token
	    		$http.get(url).then(function(response) {
		    		var token = response.data.access_token;

		    		//gets session
		    		SessionService.getSession().success(function(response) {
		    				//returns user from session
							User.update({_id:response.user._id},{ slack_token: token });
					});
	    		});
	    	}
	    }

		redirectSuccess();

  		//Controlls that switches input
	    $scope.descriptionEnabled = true;
	    $scope.contactEnabled = true;
	    $scope.linksEnabled = true;
	    $scope.class = "fa fa-pencil";
	    $scope.contact_class = "fa fa-pencil";
	    $scope.links_class = "fa fa-pencil";
	    $scope.isStudent = false;
	    var obj = null;

	    // Get profile data from DB
	    var initializeProfile = function (data) {
	        if (data != false) {
	            $scope.first_name = data.first_name;
	            $scope.last_name = data.last_name;
	            $scope.email = data.email;

	            $scope.phone_number = data.phone_number;
	            $scope.url = data.public_url;
	            $scope.homepage = data.homepage;

	            $scope.description = data.description;

	            $scope.linkedin = data.linkedin;
	            $scope.facebook = data.facebook;
	            $scope.twitter = data.twitter;
	            $scope.github = data.github;

	            $scope.user = data;
	            $scope.role = data.role;

	            $scope.courses = data.courses;

	            obj = data;

	            if(data.role == "Student")
                {
                    $scope.isStudent = true;
                }
	            $scope.personality = data.personality;

	        } else {
	            $scope.first_name = "No profile found";
	        }
	    };

	    $scope.editDescription = function () {
	        if ($scope.class == "fa fa-pencil") {
	            $scope.class = "fa fa-check"
	            $scope.descriptionEnabled = false;
	        } else {
	            obj.description = $scope.description;
	            console.log(obj);
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
	            obj.homepage = $scope.homepage;
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
	        	obj.linkedin = $scope.linkedin;
	            obj.facebook = $scope.facebook;
	            obj.twitter = $scope.twitter;
	            obj.github = $scope.github;
	            $scope.updateProfile(obj);
	            $scope.linksEnabled = true;
	            $scope.links_class = "fa fa-pencil"
	        }
	    };

		var loadUser = function(newuser) {
			initializeProfile(newuser);
      	}

	    var getUser = function () {

			SessionService.getSession().success(function(response) {
				User.get({_id:response.user._id, _populate:"courses"},function(newUser){
 					loadUser(newUser[0]);
				});
			});
	    }
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
                  homepage : user.homepage,
                  public_url: user.public_url,
                  linkedin : user.linkedin,
		          facebook : user.facebook,
		          twitter : user.twitter,
		          github : user.github
              });

	        if(user != null){
	            $scope.user = user;
	        }
	    };
		getUser();
      }
    };
  }
]);
