// public/js/controllers/coursesCtrl.js
angular.module('CoursesCtrl', []).controller('CoursesController', function($scope) {
    
    $scope.heading = "My courses";
    $scope.courses = [{
        name: "Course 1",
        assignment: "Assignment 1",
        status: "active",
        url: "course1"
    }, {
        name: "Course 2",
        assignment: "Assignment 2",
        status: "active",
        url: "course2"
    }, {
        name: "Course 3",
        assignment: "Assignment 3",
        status: "inactive",
        url: "course3"
    }, {
        name: "Course 4",
        assignment: "Assignment 12",
        status: "active",
        url: "course4"
    }];

});