app.directive('adminCourse', [
  "settings",
  "Course",
  "SessionService",
  "User",
  function(
    settings,
    Course  ,
    SessionService,
    User) {

    return {
      templateUrl: settings.widgets + 'admin/course.html',
      link: function($scope, element, attrs) {
        var session_user;
        SessionService.getSession().success(function(response){
          session_user = response.user;
        });

        $scope.btnAddOrUpdateTextCourse = 'Add course';
        
        // Updates the GUI according to edit/add-state
        var isEditingCourse = false;

         //Function that refreshes list from DB
        var refresh = function(){
          $scope.courselist = Course.get();
        };
    
        //Runs on page update
        refresh();

        var createCourse = function(){
          //$scope.course = ""; //för att course inte ska vara undefined
          var course = $scope.course;
          var c = Course.create([
            {
              status: false,
              code: course.code,
              url: course.url,
              name: course.name,
              description: course.description,
              start: course.start,
              end: course.end
            }
          ]);
          Course.onQueueDone(console.log(c));
          

          User.update({_relate:{items:session_user,courses:c}}); //no
          Course.update({_relate:{items:c,creator:session_user}}); //works
            
          $scope.courselist.push($scope.course); 
         
          $scope.course = "";
          course = null;
        };

        var updateCourse = function(){
          $scope.btnAddOrUpdateTextCourse = 'Add course';
            var course = $scope.course;
            console.log(course);
             Course.update({
                _id: course._id
              },{
                status: true,
                code: course.code,
                url: course.url,
                name: course.name,
                description: course.description,
                start: course.start,
                end: course.end
            });
            // Refresh GUI
            refresh();
            $scope.course = "";
            isEditingCourse = false;
        }

        //Gui function add course
        $scope.addOrUpdateCourse = function(){
          if(!isEditingCourse){
            createCourse();
          }
          else{
            updateCourse();
          }
        }

         //Gui function remove course
        $scope.removeCourse = function(targetcourse){
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