app.directive('profilePrivateprofile', [
  "settings",
  "User",
  "SessionService",
  "$routeParams",
  "$location",
  "$http",
  "$window",
  "Upload",
  function(
    settings,
    User,
    SessionService,
    $routeParams,
    $location,
    $http,
    $window,
    Upload
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
            var slack_username = response.data.user_id;

            console.log(response);

		    		//gets session
		    		SessionService.getSession().success(function(response) {
		    				//returns user from session
							User.update({_id:response.user._id},{ slack_token: token , slack_username: slack_username});
					});
	    		});
	    	}
	    }

		redirectSuccess();

  		//Controlls that switches input
	    $scope.descriptionEnabled = true;
	    $scope.contactEnabled = true;
	    $scope.linksEnabled = true;
	    $scope.expEnabled = true;
	    $scope.class = "fa fa-pencil";
	    $scope.contact_class = "fa fa-pencil";
	    $scope.links_class = "fa fa-pencil";
	    $scope.exp_class = "fa fa-pencil";
	    $scope.isStudent = false;
	    var obj = null;
        var isEditing = false;

	    // Get profile data from DB
	    var initializeProfile = function (data) {
	        if (data != false) {
	            $scope.first_name = data.first_name;
	            $scope.last_name = data.last_name;
	            $scope.email = data.email;

	            $scope.profile_pic = data.profile_pic;

	            //console.log(data.profile_pic);

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

	            $scope.experiences = data.experiences;

	            obj = data;

	            if(data.role == "Student")
                {
                    $scope.isStudent = true;
                }
	            $scope.personality = data.personality;

	            showPicture();

	        } else {
	            $scope.first_name = "No profile found";
	        }
	    };

	    $scope.editDescription = function () {
	            $scope.descriptionEnabled = false;
        };

        $scope.cancelDescription = function () {
	            $scope.descriptionEnabled = true;
                $scope.description = obj.description;
        };

        $scope.saveDescription = function (){
            $scope.descriptionEnabled = true;
            obj.description = $scope.description;

            User.update({
                _id: obj._id
            },{
                description: obj.description
              });

            if(obj != null){
                $scope.user = obj;
            }
            $scope.descriptionEnabled = true;
            $scope.class = "fa fa-pencil";
	    };

	    $scope.editContact = function () {

	        if ($scope.contact_class == "fa fa-pencil") {
	            $scope.contact_class = "fa fa-check"
	            $scope.contactEnabled = false;
	        } else {
                obj.email = $scope.email;
	            obj.phone_number = $scope.phone_number;
	            obj.homepage = $scope.homepage;

	            User.update({
	                _id: obj._id
	            },{
		            phone_number: obj.phone_number,
		            homepage : obj.homepage
	            });

		        if(obj != null){
		            $scope.user = obj;
		        }

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

	            User.update({
                //searchObject
                _id: obj._id
            	},{
		            linkedin : obj.linkedin,
			        facebook : obj.facebook,
			        twitter : obj.twitter,
			        github : obj.github
              	});

	            if(obj != null){
		            $scope.user = obj;
		   		}

	            $scope.linksEnabled = true;
	            $scope.links_class = "fa fa-pencil"
	        }
	    };
          
        $scope.showAddDiv = function () {
           
            $('.fa-plus').css({
                'display': 'none'
            })
            
            $('.show_add_div').css({
                'display': 'block'
            })
            
            $('.profile__stuff__ex ul').css({
                'display': 'none'
            })
        }
        
        $scope.closeAddDiv = function () {
            $('input, textarea').val('');
            $('.show_add_div').css({
                'display': 'none'
            })
            
            $('.profile__stuff__ex ul').css({
                'display': 'block'
            })
            
            $('.fa-plus').css({
                'display': 'block'
            })
            isEditing = false;
        }

	    addExp = function () {
            if(obj.experiences === undefined){
	        		obj.experiences = [];
	        	}

	            obj.experiences.push({
	            	company_school : $scope.company_school,
	        		title_education: $scope.title_education,
				    location: $scope.location,
				    info: $scope.info
				});

	        	User.update({
	                _id: obj._id
	            },{ $push: {
	                  experiences:{
	                    company_school : $scope.company_school,
		        		title_education: $scope.title_education,
					    location: $scope.location,
					    info: $scope.info
	                  }
	              }
	            });

	            if(obj != null){
		            $scope.user = obj;
                    
		   		}

	            //$scope.expEnabled = true;
                $('.show_add_div').css({
                'display': 'none'
                })
                
                $('.profile__stuff__ex ul').css({
                'display': 'block'
                })
                
                $('.fa-plus').css({
                'display': 'block'
                })
                console.log('should be hided')
	            $scope.class = "fa fa-pencil";
	        
	    };
          
        $scope.showMoreExpInfo = function() {
            if (this.showOnClickMoreInfo == true){
                this.showOnClickMoreInfo = false;
            } else{
                this.showOnClickMoreInfo = true;
            }
            
        };
        
          

	    editExp = function(){  
            
            $.each(obj.experiences, function(){
                if(this._id == $scope.exp._id){
                    this.company_school = $scope.company_school,
	        		this.title_education = $scope.title_education,
				    this.location = $scope.location,
				    this.info = $scope.info
                }
            });
            
            User.update({
               	_id: obj._id,
                experiences: {$elemMatch: {_id: $scope.exp._id}}
            },{
                "experiences.$.company_school" :  $scope.company_school,
                "experiences.$.title_education" : $scope.title_education,
                "experiences.$.location": $scope.location,
				"experiences.$.info": $scope.info
            }, function(res){
                console.log(res);
            });
            
            
            
            $('.show_add_div').css({
                'display': 'none'
                })
                
                $('.profile__stuff__ex ul').css({
                'display': 'block'
                })
                
                $('.fa-plus').css({
                'display': 'block'
                })
	    };

	    $scope.prepareEditExp = function(exp){
            
            $scope.exp = exp;
           
	    	 isEditing = true;

            
            $scope.company_school = exp.company_school;
            $scope.title_education = exp.title_education;
            $scope.location = exp.location;
			$scope.info = exp.info;
             
            $scope.showAddDiv();
	    }

	    $scope.addOrUpdateExp = function(){
	    	if(isEditing === false){
                console.log('add');
	    		addExp();
                $('input, textarea').val('');
	    	}else{
                console.log('edit');
	    		editExp();
                $('input, textarea').val('');
	    	}
	    }
        
        $scope.removeExp = function(exp){ 
            var i = obj.experiences.indexOf(exp)
            
            if(i != -1){
                obj.experiences.splice(i,1);
            }
            
           User.update({
                  _id: obj._id,
           },{
               $pull: { 
                   experiences : exp
               }
           });
            
        };

	    var getUser = function () {
			SessionService.getSession().success(function(response) {
				User.get({_id:response.user._id, _populate:"courses"},function(newUser){
 					initializeProfile(newUser[0]);
				});
			});
	    }

        showUploadDivOnHover = function(){
            $('.profile__about__img').mouseenter(function(event){
                event.stopPropagation();
                $(this).find('.upload_img').animate({
                    opacity: 1
                }, 200, function() {
                    // Animation co
                })
            });

            $('.profile__about__img').mouseleave(function(event){
                $(this).find('.upload_img').animate({
                    opacity: 0
                }, 2000, function() {
                    // Animation co
                })
            });

             $('.profile__about__img').click(function(event){
                $(this).find('.upload_img').animate({
                    opacity: 0
                }, 2000, function() {
                    // Animation co
                })
            });
        }

	   showPicture = function(){
	   		var pic = ""
        if(obj == null){ return }
	   		if(obj.profile_pic === undefined || obj.profile_pic === ""){
	   			pic = "/img/profile_default.png";
                $('.upload_img').css({
                    'opacity': '1',
                    'cursor': 'pointer'
                })
	   		}else{
                showUploadDivOnHover();
	   			pic = './uploads/' + obj.profile_pic;
	   		}
	    	$('.profile__about__img').css({
	    		'background' : 'url('+ pic + ')',
	    		'-webkit-background-size': 'contain',
			    '-moz-background-size': 'contain',
			    '-o-background-size': 'contain',
			    'background-size': 'contain'
			})
	    }

      	$scope.uploadPicture = function (file) {
            showUploadDivOnHover()
      		var strippedFileName = file.name.replace(/[\n\t\r\x20]/g, "_");
	        Upload.upload({
	            url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
	            data:{
	               	file: file
	            } //pass file as data, should be user ng-model
	        }).then(function (resp) {
	            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
	            obj.profile_pic = strippedFileName;

	            User.update({
	                _id: obj._id
	            },{
		            profile_pic: obj.profile_pic,
	              });

		        if(obj != null){
		            $scope.user = obj;
		            showPicture();
		        }

                // hideDivWhenUploaded() //NO DEFINITION?!?!?!?
	        }, function (resp) {
	            console.log('Error status: ' + resp.status);
	        }, function (evt) {
	            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
	        });
    	};


		getUser();
      }
    };
  }
]);
