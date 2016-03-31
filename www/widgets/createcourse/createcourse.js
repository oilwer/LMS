app.directive('createCourse', [
    "settings",
    "$location",
    "$window",
    "Course",
    "SessionService",
  function(
    settings,
    $location,
    $window,
    Course,
    SessionService
  ) {
        
    return {
      templateUrl: settings.widgets + 'createcourse/createcourse.html',
      link: function(scope, element, attrs) {
        
          // CURRENT COURSE VARIABLES
          //
          // session_user : ._id
          // id : on createCourse()
          // url : view
          // finalurl : created by url + path
          // name : view
          // description : view
          // start, end : view
          //
          
          
        // Note: How to make it work when directive loads?
        // Gui function fetch selected course data for editing
        scope.prepareEditCourse = function (id){
            isEditingCourse = true;
            scope.btnAddOrUpdateTextCourse = 'Update';
            //get info from db to put in the form boxes
            scope.course = Course.getById(id);
        };
        
        //Note: Update to dynamically load when revisits a ongoing creation
        //stores maximum steps allowed
        var stepsTaken = 0;
          
        //get session_user
        scope.session_user;
        SessionService.getSession().success(function(response){
            scope.session_user = response.user;
        });
          
        //used to rouate in step 3 : updates by 'courses/'+scope.url path in createCourse().
        scope.finalUrl;

        // Updates the GUI according to edit/add-state
        var isEditingCourse = false;
        scope.btnAddOrUpdate = 'Create course';
          
        //Gui function add course
        scope.addOrUpdateCourse = function(){
          if(!isEditingCourse){
              console.log("create course runs");
            scope.createCourse();
          }
          else{
            scope.updateCourse();
              console.log("update course runs");
          }
        }
          
        //All the steps in the create course process, ng-switch states
       /* scope.steps = [
            ['Create or copy','hej'],
            'Course details',
            'Preview'
          ];*/
          
        scope.steps = [{
              name: "Create or copy",
              icon: "fa-leaf",
          },{
              name: "Details",
              icon: "fa-i-cursor",
          },{
              name: "Preview",
              icon: "fa-eye",
          }];
          
        //start out on step
        scope.selection = scope.steps[0].name;

        scope.getCurrentStepIndex = function(){
        // Find index of the current step by object name
            for(var i = 0; i < scope.steps.length; i += 1) {
                if(scope.steps[i].name === scope.selection) {
                    return i;
                }
            }
           //return scope.steps.indexOf(scope.selection);
        };
          
       // Move to a defined step index
        scope.goToStep = function(index) {
          scope.selection = scope.steps[index].name;
        };
           
        // Return true if step has next step, false if not
        scope.hasNextStep = function(){
            var stepIndex = scope.getCurrentStepIndex();
            var nextStep = stepIndex + 1;
    
            if(scope.steps[nextStep] == undefined) {
                return false;
            }
            else {
                return true;
            };
        };
        
        // Return true if step has previous step, false if not
        scope.hasPreviousStep = function(){
            var stepIndex = scope.getCurrentStepIndex();
            var previousStep = stepIndex - 1;
            if(scope.steps[previousStep] == undefined) {
                return false
            }
            else {
                return true
            };
        };
          
        //move to next step
        scope.incrementStep = function() {
            if ( scope.hasNextStep() )
            {
              var stepIndex = scope.getCurrentStepIndex();
              var nextStep = stepIndex + 1;
              scope.selection = scope.steps[nextStep].name;
            }
          };
          
        //move to previous step
        scope.decrementStep = function() {
            if ( scope.hasPreviousStep() )
            {
              var stepIndex = scope.getCurrentStepIndex();
              var previousStep = stepIndex - 1;
              scope.selection = scope.steps[previousStep].name;
            }
        };
          
        //create a new course and set GUI edit options
        scope.createCourse = function(){
            
            scope.finalUrl = '/courses/' + scope.url;
            console.log(scope.finalUrl)
            
            var course = scope.course;
            console.log(course); //gets undefined?
            Course.create(
            {
                status: false,
                code: scope.code,
                url: scope.finalUrl,
                name: scope.name,
                description: scope.description,
                creator: scope.session_user._id
            }, function(course)
                {
                    //update GUI edit mode
                    isEditingCourse = true;
                    scope.btnAddOrUpdate = 'Update details';
                    scope.incrementStep();
                }
            ); 
        }

        //update a course
        scope.updateCourse = function(){
            //update existing course
            var course = scope.course;
            console.log(course);
            Course.update({
                _id: course._id
              },{
                status: true,
                code: scope.code,
                url: scope.finalUrl,
                name: scope.name,
                description: scope.description,
                start: scope.start,
                end: scope.end
            });
            console.log(course[0]);
            alert(course[0].name);
            scope.incrementStep();
        };
          
        //roate location
        scope.pathLocation = function(newLocation) {
            //add if statement for previous location - get prev path and back-forward
            console.log(newLocation);
            $location.path(newLocation);
        }
            

      }//end link
    };
  }
]);