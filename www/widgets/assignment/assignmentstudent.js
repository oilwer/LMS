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
   
          });
          
          var session_user;
            SessionService.getSession().success(function(response){
              session_user = response.user;
            });

          scope.sendAssignment = function(){
              //get file

              //get comment
              var comment = document.getElementsByName("content")[0].value;

              var participants = scope.assignment.participants;
              console.log(participants);
              isParticipant = false;
              var user = {
                  User: session_user
              }
                             
                  Assignment.update({
                    _id: $routeParams.id,
                  },{ $push: {
                      participants: {
                        comment: comment,
                        is_answerd: true
                      }
                  }
              });
            }


          
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