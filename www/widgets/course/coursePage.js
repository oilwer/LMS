app.directive('courseCoursepage', [
  "settings",
  "$location",
  "SessionService",
  "Course",
  "User",
  "$routeParams",
  "Assignment",
  "$filter",
  "Resource",
  function(
    settings,
    $location,
    SessionService,
    Course,
    User,
    $routeParams,
    Assignment,
    $filter,
    Resource
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
        scope.resourceList = [];

        var theLocation = $location.path().split(/[\s/]+/);
        var url;
          //always get the course url
          for (var i = 0; i < theLocation.length; i++ ) {
              if(theLocation[i] === "courses") {
                  url = theLocation[i+1];
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
          
          
        Course.get({ url: url, _populate:"resources"}, function(course){
          if(course[0].resources !== undefined){
            for (var i = 0; i < course[0].resources.length; i++) {
                //scope.resourceList.push(course[0].resources[i]);
                Resource.get({_id: course[0].resources[i]}, function(resource){
                    scope.resourceList.push(resource[0]);
                });
            }
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


      scope.castTheAssignmentModal = function() {
          scope.$root.$broadcast('showTheAssignmentModal');
      };

      scope.castTheResourceModal = function() {
          scope.$root.$broadcast('showTheResourceModal');
      };


        scope.locationPath = function(newPath) {
            $location.path(newPath);
          }

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
