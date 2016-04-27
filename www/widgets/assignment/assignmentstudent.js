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
        

          User.get({_id: scope.responsible_teacher }, function(user){
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
                  scope.hasAnswered = true;
                  $('.assignment-isAnswered p:first-child').prepend("<hr>" + scope.comment);
                  break;
                }
              }
            });                
          }

          //Send data to database on button click
          scope.sendAssignment = function(){

            scope.submit();

            var comment = "";
           

            User.get({_id: scope.session_user._id}, function(user){
              session_user = user[0];
       
     

              comment += document.getElementsByName("content")[0].value ;    
                       

        
             
                User.update({
                    _id: scope.session_user._id
                },{ $push: {
                    assignments:{
                    assignment: scope.assignment._id,
                    comment: comment,
                    answer_file: scope.file[0].name            
                    } 
                  }
                });
              
              document.getElementsByName("content")[0].value = ""; 

            });
                     

            //Clear file-name in input
            scope.emptyInput = function(){
                $('.output').val(""); 
            }

            
            scope.hasAnswered = true;
            $('.assignment-isAnswered p:first-child').prepend("<hr>" + scope.comment);
            document.querySelector("trix-editor[input='studentEditAssignment']").editor.insertHTML(scope.comment);
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

          scope.updateAssignmentModalShown = false;
          scope.toggleUpdateAssignmentModal = function() { 
              scope.updateAssignmentModalShown = !scope.updateAssignmentModalShown;
          };

        }//link
          
      }
    }
]);