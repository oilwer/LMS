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
          
          Course.get({name: $routeParams.name}, function(course){
            scope.course = course[0];
          }); 
          
          //get session_user
          var session_user;
          SessionService.getSession().success(function(response){
              session_user = response.user;
              setupFeedbackDetails();
          });
         
          
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
              }
              
              $(".assignment_description").append(scope.assignment.description);

              User.get({_id: scope.assignment.responsible_teacher }, function(user){
                scope.teacher = user[0].first_name + " " + user[0].last_name;
                scope.teacherUrl = user[0].public_url;
              });
          });
          
          
          //toggle description View
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
          
          //feedback object
          var setupFeedbackDetails = function() {
              scope.assignmentFeedback = {
                  grade: "",
                  comment: "",
                  user: session_user,
                  time: new Date(),
              };
          };       
          
          //the current assignmentscope
          scope.assignmentItem = "";
              
          scope.assignmentItemView = false; //hide view for individual assignment
          scope.assignmentListView = true; //show list of all assignemnt
          
          //open and update assignment scope
          scope.showAssignmentItem = function() {
              scope.assignmentListView = false;
              scope.assignmentItemView = true;
              
              var id = "0"; //placeholder, get from event data attr?
              scope.assignmentItem = getAssignmentItem(id);
          }
          
          //open assignmentList & reset assignmentscope
          scope.showAssignmentList = function() {
              scope.assignmentItemView = false;
              resetAssignmentScope(); //reset scope
              
              scope.assignmentListView = true;
          };
          
          //update and get assigmment object by id
          var getAssignmentItem = function(id) {
              var assignment = {
                  name: "Jennie Hellqvist",
                  submissionDate: "16-03-22",
                  status: "Waiting",
                  gradingOptions: [
                  "Pass", 
                  "Fail"
                  ], 
                  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lobortis sem urna, nec suscipit magna tempor ut. Nunc nec massa at libero finibus aliquam. Aliquam dapibus lacus eget tempus luctus. Quisque faucibus ac nisi molestie lobortis. Suspendisse eleifend neque at metus commodo, et consectetur nulla malesuada. Praesent luctus accumsan fermentum. Fusce feugiat lectus massa, a placerat magna gravida a. Donec porta egestas lorem, nec interdum libero ullamcorper in. Quisque ultricies nisi ac purus molestie, id cursus turpis elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc lorem nisl, tincidunt ac ipsum vitae, fermentum lacinia erat. Donec et cursus dui. Donec ut gravida libero, tempor lobortis mauris. Curabitur porttitor risus sit amet dui volutpat tincidunt. Nunc ac dapibus nulla. Proin pulvinar mattis lacus at ornare. Nullam pulvinar faucibus accumsan. Sed orci lectus, faucibus nec libero id, hendrerit auctor mauris. Pellentesque sagittis lectus purus, ac mattis turpis fringilla ac. Curabitur hendrerit mi vitae ligula mollis, sed ullamcorper est mollis.",
              }; 
              return assignment;
          };
          
          //reset assignment scope
          var resetAssignmentScope = function() {
              scope.assignmentItem = "";
              scope.assignmentFeedback = "";
          }
          
          scope.nextAssignmentItem = function() {
              // load next assignment in list
              // nice to have ?
              //find current dataattr in listView
              //get dataattr from next item in listView
              //reset assignment scope
              //load new assignment scope
          }
          scope.prevoiusAssignmentItem = function() {
              // load previous assignment in list
              // nice to have ?
          }
          
          scope.publishFeedback = function() {
              //publich feedback to be shown for the student
              console.log("add function to save and publish");
              console.log(scope.assignmentFeedback);
              scope.showAssignmentList();
              resetAssignmentScope(); //reset scope
          }
          
          scope.saveFeedback = function() {
              //saves feedback ONLY to be shown for teacher
              console.log("add function to save feedback for later");
              console.log(scope.assignmentFeedback);
              scope.showAssignmentList();
              resetAssignmentScope(); //reset scope
          }
          
           scope.quitEdit = function() {
              //saves feedback ONLY to be shown for teacher
              console.log("add function to save feedback for later");
               
                if (confirm('Are you sure you want to close without saving?')) {
                    scope.showAssignmentList();
                } else {
                    // Do nothing!
                }
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
          
      }
    };
  }
]);