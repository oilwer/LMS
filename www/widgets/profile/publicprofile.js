app.directive('profilePublicprofile', [
  "settings",
  "User",
  "$routeParams",
  function(
    settings,
    User,
    $routeParams ) {
    return {
      templateUrl: settings.widgets + 'profile/publicprofile.html',
      link: function($scope, element, attrs) {

        showPicture = function(){
            var pic = ""
            if($scope.profile_pic === undefined || $scope.profile_pic === ""){
              pic = "/img/profile_default.png";
            }else{
              pic = './uploads/' + $scope.profile_pic;
            }

            $('.profile__about__img').css({
              'background' : 'url('+ pic + ')',
              '-webkit-background-size': 'contain',
              '-moz-background-size': 'contain',
              '-o-background-size': 'contain',
              'background-size': 'contain'      
            })
        }

        User.get({ public_url: $routeParams.url, _populate:"courses"}, function(res){
          var data = res[0];

          if(data != false) {
            $scope.first_name = data.first_name;
            $scope.profile_pic = data.profile_pic;
            $scope.last_name = data.last_name;
            $scope.email = data.email;
            $scope.phone_number = data.phone_number;
            $scope.url = data.public_url;
            $scope.description = data.description;
            $scope.homepage = data.homepage;
            $scope.linkedin = data.linkedin;
            $scope.facebook = data.facebook;
            $scope.twitter = data.twitter;
            $scope.github = data.github;
            $scope.user = data;
            $scope.role = data.role;
            $scope.personality = data.personality;
            $scope.courses = data.courses;
            $scope.experiences = data.experiences;
            $scope.skills = data.skills;
          }else {
              $scope.first_name = "No profile found";
          }
            showPicture();
        }); 

        $scope.showMoreExpInfo = function() {
          if (this.showOnClickMoreInfo == true){
              this.showOnClickMoreInfo = false;
          } else{
              this.showOnClickMoreInfo = true;
          }
            
        };
        

      } 
    };
  }
]);