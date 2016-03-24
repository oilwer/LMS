app.directive('adminCourse', [
  "settings",
  "Course",
  function(
    settings,
    Course  ) {

    return {
      templateUrl: settings.widgets + 'admin/course.html',
      link: function($scope, element, attrs) {

        $scope.btnAddOrUpdateTextCourse = 'Add course';
        
        // Updates the GUI according to edit/add-state
        var isEditingCourse = false;

         //Function that refreshes list from DB
        var refresh = function(){
          $scope.courselist = Course.get();
        };
        
        //Runs on page update
        refresh();

        //Gui function add course
        $scope.addOrUpdateCourse = function() {

            // TODO: Check if not empty - FIX IN MOONGOSE
             
              // If it's not editing
              if(!isEditingCourse){
                  var course = $scope.course;
                  //Asks the courseService to add a course
                  Course.create({
                      name: course.name,
                      start: course.start,
                      end: course.end,
                      description: course.description,
                      status: course.status,
                      url: course.url,
                      teacher: course.teacher,
                      assignments: [{
                          assignment_name: course.assignment_name,
                          assignment_deadline: course.assignment_deadline
                      }],
                      students: [{
                          student_name: course.student_name
                      }],
                      resources: [{
                          resource_name: course.resource_name,
                          resource_creator: course.resource_creator
                      }],
                      messages: [{
                          title: course.title,
                          content: course.content,
                          creator: course.creator,
                          date: course.date
                      }]
                  });
                    // Pushes (updates) the GUI with the new course
                  $scope.courselist.push(course);
                  $scope.course = "";
                  course = null;
              }
              
              // If editing 
              else {

                $scope.btnAddOrUpdateTextCourse = 'Add course';
                var course = $scope.course;
                //Asks courseService to update course
                Course.update({
                    //searchObject
                    _id: course._id
                },{
                  //properties
                     name: course.name,
                      start: course.start,
                      end: course.end,
                      description: course.description,
                      status: course.status,
                      url: course.url,
                      teacher: course.teacher,
                      assignments: [{
                          assignment_name: course.assignment_name,
                          assignment_deadline: course.assignment_deadline
                      }],
                      students: [{
                          student_name: course.student_name
                      }],
                      resources: [{
                          resource_name: course.resource_name,
                          resource_creator: course.resource_creator
                      }],
                      messages: [{
                          title: course.title,
                          content: course.content,
                          creator: course.creator,
                          date: course.date
                      }]
                  });
                // Refresh GUI
                refresh();
                $scope.course = "";
                isEditingCourse = false;
              }
          };

          //Gui function remove course
          $scope.removeCourse = function(targetcourse){
            //console.log("Removed: ", targetcourse);
            $scope.course = "";
            $scope.btnAddOrUpdateTextCourse = 'Add course';
          
            // removes course with a surtain id
            Course.remove({_id: targetcourse._id});
            refresh();
          };

          //Gui function fetch selected course data for editing
          $scope.prepareEditCourse = function (id){
              isEditingCourse = true;
              $scope.btnAddOrUpdateTextCourse = 'Update';
              //get info from db to put in the form boxes
              $scope.course = Course.getById(id);
          };
      

      }
    };
  }
]);