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
          var session_user;
            SessionService.getSession().success(function(response){
              session_user = response.user;
            });
          
          
          Course.get({name: $routeParams.name}, function(course){
            scope.course = course[0];

          }); 
          
          User.get({_id: scope.responsible_teacher }, function(user){
              scope.teacher = user[0].first_name + " " + user[0].last_name;
              scope.teacherUrl = user[0].public_url;
            });

          Assignment.get({_id: $routeParams.id}, function(assignment){
             scope.assignment = assignment[0];
              if (scope.assignment.obligatory === true) {
                  scope.assignment.obligatory = "Yes";
              }
                else{
                      scope.assignment.obligatory = "No";
                }
              
              checkIfSubmitted();
          });
          
          checkIfSubmitted = function(){
              angular.forEach(scope.assignment.participants, function(value){
                  user = value.User;
                  if(user == session_user._id){
                      scope.hasAnswered = true;
                      scope.noAnswer = false;
                  }
                  else{
                      scope.hasAnswered = false;
                      scope.noAnswer = true;
                  }
                  
                  console.log("check: " + scope.hasAnswered)
              })
              
              
          }
         
          //Send data to database on button click
          scope.sendAssignment = function(){
              var participants = scope.assignment.participants;
              console.log(participants);
              isParticipant = false;
              var user = {
                  User: session_user
              }
              console.log("user " + user);
                                   

              Assignment.update({
                  _id: $routeParams.id,
                },  {
                  participants: {
                        User: session_user,
                        comment: scope.comment,
                        is_answerd: true
                }

              });
            }
          
          //Clear file-name in input
          $('.fa-times-circle').click(function(){
                $('.output').val("");  
          });
          
        
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

          }//link
          
      }
    }
]);