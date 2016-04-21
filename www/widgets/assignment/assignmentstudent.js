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
          scope.default = true;
          var session_user = "";
          SessionService.getSession().success(function(response){
            session_user = response.user;
          });
          
          scope.course = "";
          Course.get({name: $routeParams.name}, function(course){
            scope.course = course[0];
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

              User.get({_id: scope.assignment.responsible_teacher }, function(user){
                scope.teacher = user[0].first_name + " " + user[0].last_name;
                scope.teacherUrl = user[0].public_url;
              });
              
              checkIfSubmitted();
          });
          
          
          checkIfSubmitted = function(){
            User.get({_id: session_user._id}, function(user){
              session_user = user[0];
              for (var a = 0, len = session_user.assignments.length; a < len; a += 1) {
                if(session_user.assignments[a] == scope.assignment._id){
                  scope.hasAnswered = true;
                  scope.noAnswer = false;
                  scope.default = false;
                  if (graded != undefined){
                      scope.isgraded = false;
                  }
                  break;
                }
              }
            });                
          }

          //Send data to database on button click
          scope.sendAssignment = function(){
            var comment = "";
            var found = false;

            User.get({_id: session_user._id}, function(user){
              session_user = user[0];
       
              for (var a = 0, len = session_user.assignments.length; a < len; a += 1) {
                if(session_user.assignments[a].assignment === scope.assignment._id){
                  found = true;
                  comment = session_user.assignments[a].comment;
                  break;
                }
              }

              comment += document.getElementsByName("content")[0].value;

              if(found){ //update text only
                User.update(
                {
                  _id: session_user._id,
                  assignments: {$elemMatch: {assignment: scope.assignment._id} }
                },{
                    "assignments.$.comment" : comment
                  }
                );                
              }
              else{ //add assignment to user with text'
                User.update({
                    _id: session_user._id
                },{ $push: {
                    assignments:{
                    assignment: scope.assignment._id,
                    comment: comment,               
                    } 
                  }
                });
              }

            });
                     

            //Clear file-name in input
            scope.emptyInput = function(){
                $('.output').val(""); 
            }
 
          }
        
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
          
          scope.showHideEdit = "Edit submission"

          scope.toggleEdit = function() {
              //close grading if open
              if(scope.isGradingOpen){
                  scope.toggleGrading();
              }
              if (scope.isEditOpen) {
                  scope.isEditOpen = false;
                  scope.hasAnswered = true;
                  scope.showHideEdit = "Edit submission"
              } else {
                  scope.isEditOpen = true;
                  scope.hasAnswered = false;
                  scope.showHideEdit = "Close submission"
              }
          }

        }//link
          
      }
    }
]);