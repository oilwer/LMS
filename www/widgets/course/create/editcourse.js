app.directive('courseCreateEditcourse', [
    "settings",
    "$location",
    "$window",
    "$routeParams",
    "Course",
    "ChatService",
    "SessionService",
    "User",
    "Resource",
    "Assignment",
    "ChatService",
  function(
    settings,
    $location,
    $window,
    $routeParams,
    Course,
    ChatService,
    SessionService,
    User,
    Resource,
    Assignment,
    ChatService
  ) {

    return {
      templateUrl: settings.widgets + 'course/create/editcourse.html',
      link: function(scope, element, attrs) {

        var update = function() {
            scope.course.start = new Date(scope.course.start);
            scope.course.end = new Date(scope.course.end);
            if(scope.course.description !== undefined) {
                
              var textEditor = document.querySelector("trix-editor[input='updateCourseEditor']");
              textEditor.editor.setSelectedRange([0, 200000000000000]); //empty view
              textEditor.editor.deleteInDirection("forward");
              textEditor.editor.insertHTML(scope.course.description);
            }

            scope.newCourse = {
              name: scope.course.name,
              code: scope.course.code,
              url: scope.course.url,
              start: scope.course.start,
              end: scope.course.end
            };

        };

        scope.$root.$on('setUpdateCourseScope', function() {
            update();
        });

      scope.updateCourseDetails = function() {
        //create function
        scope.newCourse.description = $("#updateCourseEditor").attr("value");


        Course.update({_id: scope.course._id}, {
            name: scope.newCourse.name,
            code: scope.newCourse.code,
            url: scope.newCourse.url,
            start: scope.newCourse.start,
            end: scope.newCourse.end,
            description: scope.newCourse.description,
        }, function(res){
            $(".course_description").empty().append(scope.newCourse.description);
            scope.course.name = scope.newCourse.name;
            scope.course.start= scope.newCourse.start;
            scope.course.end = scope.newCourse.end;
            scope.course.description = scope.newCourse.description;
            $('.courseDescriptionContent').empty().append(scope.course.description);
            //todo: show user the success (GUI)
            scope.$parent.hideModal();

        });

      };


        scope.closeUpdateCourse = function() {
            if (confirm('Do you want to close without saving?')) {
                scope.$parent.hideModal();
                scope.newCourse = {
                    name: scope.course.name,
                    code: scope.course.code,
                    url: scope.course.url,
                    start: scope.course.start,
                    end: scope.course.end,
                    description: scope.course.description
                };
                var textEditor = document.querySelector("trix-editor");
                // empty all
                textEditor.editor.insertHTML(scope.course.description);
                } 
            };


        var leaveChannel = function(channelId, UserIdentifier){
          ChatService.leaveChannel(channelId, UserIdentifier).success(function(response){
          });
        }

        scope.deleteCourse = function() {
          if (confirm('Do you want to delete ' + scope.course.name + '?')) {

            Course.get({ _id: scope.course._id }, function(course){


              User.get({}, function(users){
                //Loopar Users
                for (var i = 0; i < users.length; i++) {
                  //Om mina courses contains this course, delete it from my courses
                  if(users[i].courses.indexOf(course[0]._id) != -1){
                    User.update({ _id: users[i]._id }, { $pull: { 'courses': course[0]._id }});
                  }
                  //Om mina pinned courses contains this course, delete it from my pinned courses
                  for (var x = 0; x < users[i].courses_pinned.length; x++) {
                    if(users[i].courses_pinned[x].course == course[0]._id){
                      User.update({ _id: users[i]._id }, { $pull: { 'courses_pinned': { _id: users[i].courses_pinned[x]._id }}});
                    }
                  }
                  //Remove all users from channel, even people who were not in the course, just in case
                  leaveChannel(course[0].slack_channels[0].channelId, users[i].email);
                }
              });

              Resource.get({}, function(resources){
                //loopar Resources
                for (var i = 0; i < resources.length; i++) {
                  if(resources[i].course == course[0]._id){
                    //If this resource is linked to the removed course, remove resource
                    Resource.remove({_id: resources[i]._id});
                  }
                }
              });

              Assignment.get({}, function(assignments){
                //loopar assignments
                for (var i = 0; i < assignments.length; i++) {
                  if(assignments[i].course == course[0]._id){
                    Assignment.remove({_id: assignments[i]._id});
                  }
                }
              });
            });

            Course.remove({_id: scope.course._id});

            scope.$parent.hideModal();

            $location.path('/courses/');
          }
        };
      }//end link
    };
  }
]);
