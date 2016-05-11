app.config([
  "$routeProvider",
  "$locationProvider",
  function(
    $routeProvider,
    $locationProvider
  ) {
    //route config
    $routeProvider
      .when("/", {
        templateUrl: "templates/home.html",
      })
      .when("/admin/", {
        templateUrl: "templates/admin.html",
      })
      .when("/admin/usermanager", {
        templateUrl: "templates/usermanager.html",
      })
      .when("/admin/userlist", {
        templateUrl: "templates/userlist.html",
      })
      .when("/manager/", {
        templateUrl: "templates/usermanager.html",
      })
        .when("/connectstudents/", {
        templateUrl: "templates/connectstudents.html",
      })
       .when("/courses/", {
        templateUrl: "templates/courses.html",
      })
       .when("/courses/:name/assignment/:id", {
        templateUrl: "templates/assignment.html",
      })
       //
       .when("/courses/:id", {
        templateUrl: "templates/course.html",
      })
        .when("/courses/:id/participants/", {
            templateUrl: "templates/connectstudents.html",
        })
        .when("/courses/:id/participants/edit", {
            templateUrl: "templates/studentsaddremove.html",
        })
      .when("/courses/:id/resources/", {
        templateUrl: "templates/resources.html",
      })
      .when("/courses/:id/resources/:titel", {
        templateUrl: "templates/singleResource.html",
      })
        .when("/courses/:type/:id", {
        templateUrl: "templates/course.html",
      })
      .when("/dash", {
        templateUrl: "templates/dash.html"
      })
      .when("/myprofile/", {
        templateUrl: "templates/privateprofile.html",
      })
      .when("/profile/:url", {
        templateUrl: "templates/publicprofile.html",
      })
      .when("/chat/", {
        templateUrl: "templates/chat_template.html",
      })
      .when("/resources/", {
        templateUrl: "templates/resources.html",
      })
      .when("/resources/:titel", {
        templateUrl: "templates/singleResource.html",
      })
      .otherwise({
        redirectTo: "/"
      });

    $locationProvider.html5Mode(true);
  }
])

.constant('settings', {
  'templates': '/templates/',
  'widgets': '/widgets/'
});
