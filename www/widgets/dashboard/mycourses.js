app.directive('dashboardCourses', [
  "settings",
  "$location",
  function(
    settings,
    $location
  ) {

    return {
      templateUrl: settings.widgets + 'dashboard/mycourses.html',
      link: function(scope, element, attrs) {
      scope.heading = "My courses";
      
      scope.class = "assignClass"
      //placeholder for all the users courses, get from db
      scope.courses = [{
          name: "Web development",
          status: "active",
          url: "testcourse",
          configDone:true,
          assignments: 17
      }, {
          name: "National economics",
          status: "active",
          url: "testcourse",
          configDone:false,
          assignments: 10
      }, {
          name: "Project management",
          status: "inactive",
          url: "testcourse",
          configDone:true
      }, {
          name: "Project course: IT",
          status: "active",
          url: "testcourse",
          configDone:true,
          assignments: 100
      }];
          

          
    scope.courseLocation = function(obj) {
        console.log(obj.currentTarget.attributes.dataLocation.value);
              // Redirects to cource url saved in the clicked elements dataLocation attr
        $location.path("courses/" + obj.currentTarget.attributes.dataLocation.value);
          };
          
      }

    };
  }
]);