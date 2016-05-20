app.directive('courseCoursepage', [
  "settings",
  "$location",
  "SessionService",
  "Course",
  "User",
  "$routeParams",
  "Assignment",
  "$filter",
  function(
    settings,
    $location,
    SessionService,
    Course,
    User,
    $routeParams,
    Assignment,
    $filter
  ) {

    return {
      templateUrl: settings.widgets + 'course/coursePage.html',
      link: function(scope, element, attrs) {


        var session_user;
        SessionService.getSession().success(function(response){
          session_user = response.user;
          if(response.user.role == "student"){
            scope.showCourseinfo = false;
          } else {
            scope.showCourseinfo = true;
          }
        });


        scope.course = "";
        scope.assignments = "";

        var theLocation = $location.path().split(/[\s/]+/);
        var url;
          //always get the course url
          for (var i = 0; i < theLocation.length; i++ ) {
              if(theLocation[i] === "courses") {
                  url = theLocation[i+1];
                  console.log("hittar");
                  break;
              }
          }

        Course.get({url: url, _populate:"assignments"}, function(course){
            scope.course = course[0];
            $('.courseDescriptionContent').empty().append(scope.course.description);
            scope.assignments = scope.course.assignments;
            if(scope.course.creator != undefined){
              User.get({_id: scope.course.creator}, function(user){
                scope.teacher = user[0].first_name + " " + user[0].last_name;
                scope.teacherUrl = user[0].public_url;
              });
            }
        });


        var refresh = function(){
            Course.get({url: url}, function(course){
              scope.course = course[0];
              scope.messages = scope.course.messages; //load messages
              scope.content = "";
              scope.title = "";
            });
        };

        //Runs on page update
        //refresh();

        scope.publishMsg = function(){
          if(scope.title && scope.content){
            var course = scope.course;
            var date = new Date();
            var today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);



            Course.update({
                _id: course._id
            },{ $push: {
                  messages:{
                    title: scope.title,
                    content: scope.content,
                    creator: session_user,
                    date: date
                  }
              }
            });

            // Refresh GUI
            // do not refresh, push message to messages
            refresh();
        }
      }



      scope.editInfo = function () {
          console.log("editInfo scope test");
      };

      scope.castTheAssignmentModal = function() {
          scope.$root.$broadcast('showTheAssignmentModal');
      };

      scope.castTheResourceModal = function() {
          scope.$root.$broadcast('showTheResourceModal');
      };








        //     //TODO:
        //     //display changes in view (notifications)
        //     //Progress
        // };

        //show hide modal create course
        scope.modalShown = false;

        scope.toggleModal = function() {
          scope.$root.$broadcast('setUpdateCourseScope');
          scope.modalShown = !scope.modalShown;
          //fix for toolbar toggle, element event don't fire on modalshow()
          scope.isToolbarPersonalOpen = false;
          scope.isToolbarCreateOpen = false;
        };
      }
    };
  }
]);
