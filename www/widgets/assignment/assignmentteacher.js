app.directive('assignmentAssignmentteacher', [
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
      templateUrl: settings.widgets + 'assignment/assignmentteacher.html',
      link: function(scope, element, attrs) {

          //get session_user
          var session_user;
          SessionService.getSession().success(function(response){
             session_user = response.user;

             console.log(response.user._id);

              User.get({_id: response.user._id}, function(user)
              {
                console.log(user[0]);
                session_user = user[0];

                //current assignment
                Assignment.get({_id: $routeParams.id}, function(assignment){
                    scope.assignment = assignment[0];
                    assignment = assignment[0];
                    scope.assignment.due_date = new Date(scope.assignment.due_date); //create object
                    if (scope.assignment.obligatory === true) {
                        scope.obligatoryText = "Yes";
                    }
                      else{
                          scope.obligatoryText = "No";
                    };

                    var obj = session_user.assignments.filter(function ( obj ) {
                      return obj.assignment === scope.assignment._id;
                    })[0];

                    console.log(obj);

                    scope.answer_file = obj.answer_file.replace(/[\n\t\r\x20]/g, "_");

                    $(".assignment_description").append("Assignment description:\n ", scope.assignment.description);
                    if (scope.answer_file) {
                        $('.submittedFile').empty().append('<a target="_blank" href="uploads/' + scope.answer_file + '">' + scope.answer_file + '</a>');
                    }

                    User.get({_id: scope.assignment.responsible_teacher }, function(user){
                      scope.teacher = user[0].first_name + " " + user[0].last_name;
                      scope.teacherUrl = user[0].public_url;
                    });
                });


              });
          });




          scope.setUp = function() {
              scope.assignmentAnswers = [];

              User.get({courses: scope.course._id}, function(users){

                  //look for assignments in all the users bind to a course
                  for (var a = 0, userlength = users.length; a < userlength; a += 1) {

                        //only add students
                        if(users[a].role === "student") {
                            //assignmentlist exists
                          if(users[a].assignments.length > 0) {

                              //loop assignmentlist
                              var notFound = true;
                              for(var b = 0; users[a].assignments.length > b; b++) {

                                  //check for match
                                  if(users[a].assignments[b].assignment === scope.assignment._id) {
                                      notFound = false; //found
                                      var Item = {
                                      assignmentId: scope.assignment._id,
                                      name: users[a].first_name + " " + users[a].last_name,
                                      userId: users[a]._id,
                                      submissionDate: new Date(users[a].assignments[b].submissionDate),
                                      status: users[a].assignments[b].status,
                                    };
                                    scope.assignmentAnswers.push(Item);
                                      break; //assignment found, break loop - no need to continue
                                  }
                              };
                          //no match
                          if (notFound) {
                              var Item = {
                                  assignmentId: scope.assignment._id,
                                  name: users[a].first_name + " " + users[a].last_name,
                                  userId: users[a]._id,
                                  submissionDate: "-",
                                  status: "Not Submitted",
                              };
                              scope.assignmentAnswers.push(Item);
                          };

                          //assignment list do not exist
                          } else {
                              var Item = {
                              assignmentId: scope.assignment._id,
                              name: users[a].first_name + " " + users[a].last_name,
                              userId: users[a]._id,
                              submissionDate: "-",
                              status: "Not Submitted",
                            };
                            scope.assignmentAnswers.push(Item);
                          };
                      };
                  };
              });
          }; //setUp

          setTimeout(scope.setUp, 500); //fix - wait for scope to load

          //toggle description View
          scope.showHideBtn = "Show description"
          scope.toggleDescription = function() {
            //  close grading if open
            //  if(scope.isGradingOpen){
            //      scope.toggleGrading();
            //  };
              if (scope.isDescriptionOpen) {
                  scope.isDescriptionOpen = false;
                  scope.showHideBtn = "Show description"
              } else {
                  scope.isDescriptionOpen = true;
                  scope.showHideBtn = "Hide description"
              };
          };

          //the current assignmentscope - show assignmentitems in the modal
          scope.assignmentItem = "";

          scope.assignmentItemView = false; //hide view for individual assignment
          scope.assignmentListView = true; //show list of all assignemnt

          //open, get and update assignment scope
          scope.showAssignmentItem = function(assignId, studId) {
              scope.assignmentListView = false;
              scope.assignmentItemView = true;

              User.get({_id: studId}, function(user){
                  user = user[0];
                  var submissionNotFound = true;
                  for (var a = 0, len = user.assignments.length; a < len; a += 1) {
                    if(user.assignments[a].assignment == assignId){
                        submissionNotFound = false;
                        scope.assignmentItem = {
                            name: user.first_name + " " + user.last_name,
                            answeredBy: session_user._id,
                            assignmentId: assignId,
                            studentId: studId,
                            answer_file: user.assignments[a].answer_file,
                            submissionDate: new Date(user.assignments[a].submissionDate),
                            status: user.assignments[a].status,
                            answerComment: user.assignments[a].answerComment, //feedback from teacher
                            answerDate: user.assignments[a].answerDate,//lägg till klar, bedömnd men inte klar,
                            gradingOptions: [
                            "Resubmit",
                            "Done"
                            ],
                            content: user.assignments[a].comment
                        };

                        if(user.assignments[a].status === "Done" || user.assignments[a].status === "Resubmit") {
                            scope.assignmentItem.feedbackStatus = user.assignments[a].status;
                        } else {
                            scope.assignmentItem.feedbackStatus = "default";
                        }

                        $(".assignment_content").append(scope.assignmentItem.content);
                        $('.submittedFile').empty().append('<a target="_self" href="uploads/' + scope.assignmentItem.answer_file + '" download>' + scope.assignmentItem.answer_file + '</a>');

                      break; //assignment found - stop looking
                    };
                      if(submissionNotFound) {
                        scope.assignmentItem = {
                            name: user.first_name + " " + user.last_name,
                            answeredBy: session_user._id,
                            assignmentId: assignId,
                            studentId: studId,
                            submissionDate: "",//users.assignments[a].submissionDate, //lägg till i skicka in
                            status: "Not submitted",
                            answerComment: "", //feedback from teacher
                            answerDate: "",//lägg till klar, bedömnd men inte klar,
                            gradingOptions: [
                            "Resubmit",
                            "Done"
                            ],
                            content: user.assignments[a].comment,
                        };
                          scope.assignmentItem.feedbackStatus = "default";
                    };
                  };
              });
          };

          //open assignmentList & reset assignmentscope
          scope.showAssignmentList = function() {
              scope.assignmentItemView = false;
              resetAssignmentScope(); //reset scope
              scope.assignmentListView = true;
          };

          //reset assignment scope
          var resetAssignmentScope = function() {
              scope.assignmentItem = "";
              $(".assignment_content").empty();
              $('.submittedFile').empty();
          };

          scope.nextAssignmentItem = function() {
              // load next assignment in list -- nice to have
              //find current dataattr in listView
              //get dataattr from next item in listView
              //reset assignment scope
              //load new assignment scope
          };
          scope.prevoiusAssignmentItem = function() {
              // load previous assignment in list -- nice to have
              //find current dataattr in listView
              //get dataattr from previous item in listView
              //reset assignment scope
              //load new assignment scope
          }

          //publich feedback to be shown for the student
          scope.publishFeedback = function() {
              User.update(
                {
                  _id: scope.assignmentItem.studentId,
                  assignments: {$elemMatch: {assignment: scope.assignmentItem.assignmentId} }
                },{
                    "assignments.$.answeredBy" : scope.assignmentItem.answeredBy,
                    "assignments.$.answerComment" : scope.assignmentItem.answerComment,
                    "assignments.$.answerDate" : scope.assignmentItem.answerDate,
                    "assignments.$.status" : scope.assignmentItem.feedbackStatus
                  }
                );

              scope.setUp();
              scope.showAssignmentList();
              resetAssignmentScope(); //reset scope
          };

          scope.saveFeedback = function() {
              //saves feedback ONLY to be shown for teacher --- nice to have?
          };

          scope.quitEdit = function() {
            if (confirm('Are you sure you want to close without saving?')) {
                scope.showAssignmentList();
                resetAssignmentScope(); //reset scope
            } else {
                // Do nothing!
            };
          };


          //grading detail view
          /*scope.toggleGrading = function() {
              //close description if open
              if(scope.isDescriptionOpen){
                  scope.toggleDescription();
              }
              if (scope.isGradingOpen) {
                  scope.isGradingOpen = false;
              } else {
                  scope.isGradingOpen = true;
              }
          }*/

            //show hide modal update assignment
            scope.updateAssignmentModalShown = false;
            scope.toggleUpdateAssignmentModal = function() {
                scope.updateAssignmentModalShown = !scope.updateAssignmentModalShown;
            };

      }//link
    };
  }
]);
