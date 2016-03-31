app.directive('courseList', [
  "settings", 
  "$location",
  "SessionService",
  function(
    settings,
    $location,
    SessionService
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
          SessionService.getSession().success(function(data) {
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