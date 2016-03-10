// public/js/controllers/coursesCtrl.js
angular.module('CoursesCtrl', []).controller('CoursesController', function($scope, Profile, UserService, $location) {
    //controller for course overview and course page, split?
    
    $scope.heading = "My courses";
    
    //placeholder for all the users courses, get from db
    $scope.courses = [{
        name: "Course 1",
        assignment: "Assignment 1",
        status: "active",
        url: "testcourse"
    }, {
        name: "Course 2",
        assignment: "Assignment 2",
        status: "active",
        url: "testcourse"
    }, {
        name: "Course 3",
        assignment: "Assignment 3",
        status: "inactive",
        url: "testcourse"
    }, {
        name: "Course 4",
        assignment: "Assignment 12",
        status: "active",
        url: "testcourse"
    }];
    
    //the current courseobject, get from db
    $scope.course = {
        name: "Course 1",
        description: "Test description",
        start: "16-03-09",
        end: "16-06-04",
        assignments: [{
            name: "assigment 1",
            deadline: "datum"
        }, {
            name: "assigment 2",
            deadline: "date"
        }],
        teaching: [{ //contacts and info
            name: "Teacher One", //obj
            role: "teacher"
        }, {
            name: "Teacher Two", //obj?
            role: "admin"
        }],
        resources: [{ //resources linked to course? obj?
            name: "The resource name",
            creator: "Teacher One" //obj?
        }, {
            name: "The resource name",
            creator: "Teacher Two" //obj?
        }],
        students: [{ //contacts and info
            name: "Student One", //obj
        }, {
            name: "Student Two", //obj?
        }]        
        
        //TODO: 
        //display changes in view (notifications)
        //Progress
    };
    
    $scope.openClose = function() {
        $scope.class="fa fa-chevron-right"
    }
    
    
    $scope.courseLocation = function(obj) {
        // Redirects to cource url saved in the clicked elements dataLocation attr
        $location.path("courses/" + obj.currentTarget.attributes.dataLocation.value);
    }
    
    // Get profile data from session needed?
    // fetch userobject and data
	Profile.get().success(function(data) {
		if(data != false) {
			$scope.user = data;
		}else {
			$scope.first_name = "No profile found";
		}
	});
    
});