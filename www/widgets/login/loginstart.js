app.directive('loginLoginstart', [
    "settings",
    "User",
    "LoginService",
    "$location",
    "$window",
    function (settings,
              User,
              LoginService,
              $location,
              $window) {

        return {
            templateUrl: settings.widgets + 'login/login.html',
            link: function (scope, element, attrs) {
                scope.errorMsg = "Enter your credentials";
                scope.class = "login--error-hide"; //reset class

                scope.loginFunc = function () {
                    scope.errorMsg = "Enter your credentials";
                    scope.class = "login--error-hide"; //reset class

                    //Dummy user to be able to login and setup stuff
                    User.create({
                        email: "admin",
                        password: "admin",
                        first_name: "James",
                        last_name: "Bond",
                        description: "Well dressed agent who has a licence to kill!",
                        personality: "Agent",
                        public_url: "admin",
                        role: "admin" //student/admin/teacher
                    });


                    LoginService.login(scope.email, scope.password).success(function (response) {
                        //console.log(response);
                        if (response) {
                            $window.location.href = '/';
                        } else {
                            scope.errorMsg = "Wrong email or password, please try again";
                            scope.class = "login--error-show"; //reset class
                        }
                    });


                };

                scope.forgotPassword = function () {
                    $window.location.href = '/forgotPassword';
                }


            }
        };
    }
]);






