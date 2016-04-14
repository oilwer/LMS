app.directive('assignmentAssignmentteacher', [
  "settings",
  "Assignment",
  "$routeParams",
  "Course",
  "User",
  function(
    settings,
    Assignment,
    $routeParams,
    Course,
    User
  ) {
	  
    return {
      templateUrl: settings.widgets + 'assignment/assignmentteacher.html',
      link: function(scope, element, attrs) {
          
          console.log("teacher view!");

          Course.get({name: $routeParams.name}, function(course){
            scope.course = course[0];
          }); 
          
          
          User.get({_id: scope.responsible_teacher }, function(user){
              scope.teacher = user[0].first_name + " " + user[0].last_name;
              scope.teacherUrl = user[0].public_url;
            });
          
          //current assignment
          Assignment.get({_id: $routeParams.id}, function(assignment){
             scope.assignment = assignment[0];
              if (scope.assignment.obligatory === true) {
                  scope.assignment.obligatory = "Yes";
              }
                else{
                      scope.assignment.obligatory = "No";
                }
   
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
          
      }
    };
  }
]);