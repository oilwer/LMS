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
    .when("/connectstudents/", {
        templateUrl: "templates/connectstudents.html",
      })
       .when("/courses/", {
        templateUrl: "templates/courses.html",
      })
       // 
       .when("/courses/:id", {
        templateUrl: "templates/course.html",
      })
        .when("/courses/:type/:id", {
        templateUrl: "templates/course.html",
      })
       // static course, to be updated with dynamic course url
      .when('/courses/testcourse', {
          templateUrl: 'templates/course.html',
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