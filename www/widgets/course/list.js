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
          
          $scope.castTheCourseModal = function() {
            $scope.$root.$broadcast('showTheCourseModal');
        };
      }
    };
  }
]);