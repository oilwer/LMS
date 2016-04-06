app.directive('assignmentAssignmentlist', [
  "settings",
  "$routeParams",
  "Assignment",
  function(
    settings,
    $routeParams,
    Assignment
  ) {
    
    return {
      templateUrl: settings.widgets + 'assignment/assignmentlist.html',
      link: function(scope, element, attrs) {

          //Get all courses by name from url, populate fills all the 
          //connected studests so we can get their data. 
          //ng repeat with response of students
          console.log("This page works");
         
          // var course = Course.get(function(res){
          //    scope.users = res[0].students;
          // });
            Assignment.create({"name": "Test assignment2asafasffa"}, function(res){

              console.log("dinmmamma", res);
            });

            var t = Assignment.getById("5704f5ed9e351cde1fbbda69", function(res){
              console.log("yolo", res[0]);
              alert("EAT SHIT");
            });

           
            Assignment.onQueueDone(console.log("yolo", t));
            console.log("yolo", t);
      }
    };
  }
]);
