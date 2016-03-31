app.directive('connectStudentsaddremove', [
  "settings",
  "User", 
  function(
    settings,
    User
  ) {
	  
    return {
      templateUrl: settings.widgets + 'connect/studentsaddremove.html',
      link: function(scope, element, attrs) {
          
          
         
          
	  		
	      scope.students = [{
              name: "Student 1",
             
          }, {
              name: "Student 2",
              
          }, {
              name: "Student 3",
              
          }, {
              name: "Student 4",
         
          }, {
              name: "Student 5",
                   
          }, {
              name: "Student 6",
                       
          }, {
              name: "Student 7",
                       
          }, {
              name: "Student 8",
          }, {
              name: "Student 2",
              
          }, {
              name: "Student 3",
              
          }, {
              name: "Student 4",
         
          }, {
              name: "Student 5",
                   
          }, {
              name: "Student 6",
                       
          }, {
              name: "Student 7",
                       
          }, {
              name: "Student 8",
          }, {
              name: "Student 2",
              
          }, {
              name: "Student 3",
              
          }, {
              name: "Student 4",
         
          }, {
              name: "Student 5",
                   
          }, {
              name: "Student 6",
                       
          }, {
              name: "Student 7",
                       
          }, {
              name: "Student 8",
              
          }];
          
          
          scope.addUsers = function()
          {
              alert("Adding users");
              console.log(scope.students);
          }
          
          
          
          
      }
  
    }
}
]);

