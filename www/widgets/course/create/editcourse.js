app.directive('courseCreateEditcourse', [
    "settings",
    "$location",
    "$window",
    "$routeParams",
    "Course",
    "ChatService",
    "SessionService",
  function(
    settings,
    $location,
    $window,
    $routeParams,
    Course,
    ChatService,
    SessionService
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

        //console.log("new course", scope.newCourse);
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

          scope.deleteCourse = function() {
            if (confirm('Do you want to delete ' + scope.course.name + '?')) {

              Course.remove({_id: scope.course._id});
              scope.$parent.hideModal();

              $location.path('/courses/');
            } else {
                //
            }

          };
      }//end link
    };
  }
]);
