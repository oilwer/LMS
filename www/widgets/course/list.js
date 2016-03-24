app.directive('courseList', [
  "settings", 
  "$location",
  function(
    settings,
    $location
    ) {

    return {
      templateUrl: settings.widgets + 'course/list.html',
      link: function($scope,  element, attrs) {
       

      $scope.heading = "My courses";
          
          //placeholder for all the users courses, get from db
          $scope.courses = [{
              name: "Web development",
              assignment: "Assignment 1",
              status: "active",
              url: "testcourse"
          }, {
              name: "National economics",
              assignment: "Assignment 2",
              status: "active",
              url: "testcourse"
          }, {
              name: "Project management",
              assignment: "Assignment 3",
              status: "inactive",
              url: "testcourse"
          }, {
              name: "Project course: IT",
              assignment: "Assignment 12",
              status: "active",
              url: "testcourse"
          }];
          
          //the current courseobject, get from db
          $scope.course = {
              name: "Web development",
              description: "Communication for Development is an interdisciplinary field of study and practice, combining studies on culture, communication and development and integrating them with practical fieldwork. It explores the use of communication – both as a tool and as a way of articulating processes of social change – within the contexts of globalisation.",
              start: "16-03-09",
              end: "16-06-04",
              assignments: [{
                  name: "assigment 1",
                  deadline: "datum"
              }, {
                  name: "assigment 2",
                  deadline: "date"
              }],
              messages: [{
                  title: "assigment 1",
                  content: "test content",
                  creator: "teacher", //obj?
                  date: "datum"
              }, {
                  title: "assigment 1",
                  content: "test content",
                  creator: "teacher", //obj?
                  date: "datum"
              }],
              teaching: [{ //contacts and info
                  name: "Teacher One", //obj?
                  role: "teacher",
                  profile: "teacherone"
              }, {
                  name: "Teacher Two", //obj?
                  role: "admin",
                  profile: "teachertwo"
              }],
              resources: [{ //resources linked to course? obj?
                  name: "The resource name",
                  creator: "Teacher One" //obj?
              }, {
                  name: "The resource name",
                  creator: "Teacher Two" //obj?
              }],
              students: [{ //contacts and info
                  name: "Student One", //obj
              }, {
                  name: "Student Two", //obj?
              }]        
              
              //TODO: 
              //display changes in view (notifications)
              //Progress
          };
          
          $scope.openClose = function() {
              $scope.class="fa fa-chevron-right"
          };
          
          
          $scope.courseLocation = function(obj) {
            console.log(obj.currentTarget.attributes.dataLocation.value);
              // Redirects to cource url saved in the clicked elements dataLocation attr
              $location.path("courses/" + obj.currentTarget.attributes.dataLocation.value);
          };
          
          // Get profile data from session needed?
          // fetch usero  bject and data
          Profile.get().success(function(data) {
            if(data != false) {
              $scope.user = data;
            }else {
              $scope.first_name = "No profile found";
            }
          });
          
            //$scope.class = "fa-plus-square-o"; 
          
           $scope.toggleCustom = function() {
             // $scope.changeClass = function(){
               $scope.custom = $scope.custom === false ? true: false;
          };
              
              


      }
    };
  }
]);