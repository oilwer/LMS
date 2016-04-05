app.directive('createcourseButtoncreatecourse', [
    "settings",
    "$location",
  function(
    settings,
    $location
    ) {

    return {
      templateUrl: settings.widgets + 'createcourse/buttoncreatecourse.html',
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