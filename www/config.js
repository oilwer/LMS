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