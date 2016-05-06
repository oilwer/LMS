app.directive('connectIndividual', [
  "settings",
  "Course",
  "User",
  "$location",
  function(
    settings,
    Course,
    User,
    $location
  ) {
    return {
      templateUrl: settings.widgets + 'connect/individual.html',
      link: function(scope, element, attrs) {


        var url = $location.path().split(/[\s/]+/).pop();

        Course.get({ url: url , _populate:"students"}, function(res){
          for (var i = 0; i < res[0].students.length; i++) {
            showPicture(res[0].students[i]);
          }
        });

        showPicture = function(user){
          console.log(user.profile_pic);
            var pic = ""
            if(user.profile_pic === undefined || user.profile_pic === ""){
              pic = "/img/profile_default.png";
            }else{
              pic = './uploads/' + user.profile_pic;
            }

            $('.profile__about__img').css({
              'background' : 'url('+ pic + ')',
              '-webkit-background-size': 'contain',
              '-moz-background-size': 'contain',
              '-o-background-size': 'contain',
              'background-size': 'contain'
            })
        }

        element.hide();
        element.fadeIn(300);
      }
    };
  }
]);
