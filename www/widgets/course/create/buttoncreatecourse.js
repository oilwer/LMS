app.directive('courseCreateButtoncreatecourse', [
    "settings",
    "$location",
  function(
    settings,
    $location
    ) {

    return {
      templateUrl: settings.widgets + 'course/create/buttoncreatecourse.html',
      link: function($scope, element, attrs) {
          
       $scope.modalShown = false;
          $scope.toggleModal = function() {
            $scope.modalShown = !$scope.modalShown;
          };
        
          
         /* scope.createCourse = function() {
            $location.path('/create-course');
          };*/
          
          
      }//link
    };
  }
]);