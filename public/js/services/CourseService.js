/**
 * Created by simon on 3/16/16.
 */

// public/js/services/CourseService.js
angular.module('CourseService', []).factory('CourseService', ['$http', function($http) {

    return {

        // Get course list
        getCourseList : function() {
            return $http.get('/api/courselist/');
        },

        // Get course by ID
        getById : function(id) {
            return $http.get('/api/course?id=' + id);
        },

        // Update course by ID
        updateCourse : function (course){
            return $http.put('/api/course/', course);
        },

        // Add course
        addCourse : function(course) {
            return $http.post('/api/course/', course);
        },

        // Delete course by ID
        delete : function(id) {
            return $http.delete('/api/course?id=' + id);
        }
    }
}]);