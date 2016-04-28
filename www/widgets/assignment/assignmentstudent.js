app.directive('assignmentAssignmentstudent', [
  "settings",
  "Assignment",
  "$routeParams",
  "Course",
  "User",
  "SessionService",
  function(
    settings,
    Assignment,
    $routeParams,
    Course,
    User,
    SessionService
  ) {

    return {
      templateUrl: settings.widgets + 'assignment/assignmentstudent.html',
      link: function(scope, element, attrs) {
          $ = angular.element;
          scope.session_user = "";

          SessionService.getSession().success(function(response){
            scope.session_user = response.user;
          });


          scope.course = "";
          Course.get({name: $routeParams.name}, function(course){
            scope.course = course[0];
          });


          User.get({_id: scope.course.responsible_teacher }, function(user){
              scope.teacher = user[0].first_name + " " + user[0].last_name;
              scope.teacherUrl = user[0].public_url;
          });

          scope.assignment = "";
          Assignment.get({_id: $routeParams.id}, function(assignment){
             scope.assignment = assignment[0];
              if (scope.assignment.obligatory === true) {
                  scope.assignment.obligatory = "Yes";
              }
              else{
                  scope.assignment.obligatory = "No";
              }
              $(".assignment_description").append(scope.assignment.description);
              checkIfSubmitted();
          });

          checkIfSubmitted = function(){
            User.get({_id: scope.session_user._id}, function(user){
              scope.session_user = user[0];
              scope.answer = "";
              scope.comment = "";
              for (var a = 0, len = scope.session_user.assignments.length; a < len; a += 1) {
                if(scope.session_user.assignments[a].assignment == scope.assignment._id){
                  scope.comment = scope.session_user.assignments[a].comment;
                  scope.answer_file = scope.session_user.assignments[a].answer_file.replace(/[\n\t\r\x20]/g, "_");
                  scope.hasAnswered = true;
                  $('.assignment-isAnswered p:first-child').prepend("<hr>" + scope.comment +"\n"+ scope.answer_file);
                }
              }
            });
          };

          //Send data to database on button click
          scope.sendAssignment = function(){
              console.log("körs");

            scope.submit();
            scope.comment = "";
            var comment = "";

            User.get({_id: scope.session_user._id}, function(user){
              session_user = user[0];

              comment += document.getElementsByName("content")[0].value;

              //console.log(scope.file);
              var strippedFileName = scope.file[0].name.replace(/[\n\t\r\x20]/g, "_");


                User.update({
                    _id: scope.session_user._id
                },{ $push: {
                    assignments:{
                      assignment: scope.assignment._id,
                      comment: comment,
                      submissionDate: new Date(),
                      status: "Submitted",
                      answer_file: strippedFileName
                    }
                  }
                }, function(res) {
                      console.log("response", res);
                });

              document.getElementsByName("content")[0].value = "";
              $('.assignment-isAnswered p:first-child').prepend("<hr>" + comment +"\n"+ strippedFileName);

            });

            scope.hasAnswered = true;
            //console.log("comment att prepend:", scope.comment, comment);
            //document.querySelector("trix-editor[input='studentEditAssignment']").editor.insertHTML(scope.comment);
        };

          scope.showHideBtn = "Show description"

          scope.toggleDescription = function() {
              //close grading if open
              if(scope.isGradingOpen){
                  scope.toggleGrading();
              }
              if (scope.isDescriptionOpen) {
                  scope.isDescriptionOpen = false;
                  scope.showHideBtn = "Show description"
              } else {
                  scope.isDescriptionOpen = true;
                  scope.showHideBtn = "Hide description"
              }
          }

          scope.updateAssignmentModalShown = false;
          scope.toggleUpdateAssignmentModal = function() {
              scope.updateAssignmentModalShown = !scope.updateAssignmentModalShown;
          };

        }//link

      }
    }
]);
