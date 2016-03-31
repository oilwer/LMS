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
          // id : creates by system - returns
          // url: creates by function
          // name : view
          // description : view
          // start, end : view
          //
          
          
        //get user
        scope.session_user;
        SessionService.getSession().success(function(response){
            scope.session_user = response.user;
        });
          
        //All the avaible steps in the create course process
        scope.steps = [
            'Step 1: Create or copy',
            'Step 2: Course details',
            'Step 3: Preview'
          ];
          
        //start out on step - update to represent current position in process when re-enter
        scope.selection = scope.steps[0];

        scope.getCurrentStepIndex = function(){
        // Get the index of the current step
           return scope.steps.indexOf(scope.selection);
        };
          
       // Go to a defined step index
        scope.goToStep = function(index) {
          scope.selection = scope.steps[index];
        };
          
          
        scope.hasNextStep = function(){
            var stepIndex = scope.getCurrentStepIndex();
            var nextStep = stepIndex + 1;
            // Return true if there is a next step, false if not
            if(scope.steps[nextStep] == undefined) {
                return false
            }
            else {
                return true
            };
        };

        scope.hasPreviousStep = function(){
            var stepIndex = scope.getCurrentStepIndex();
            var previousStep = stepIndex - 1;
            // Return true if there is a next step, false if not
            if(scope.steps[previousStep] == undefined) {
                return false
            }
            else {
                return true
            };
        };
          
        //next step
         scope.incrementStep = function() {
            if ( scope.hasNextStep() )
            {
              var stepIndex = scope.getCurrentStepIndex();
              var nextStep = stepIndex + 1;
              scope.selection = scope.steps[nextStep];
                //if-else depending on step taken
                //Step 1.
                //create new course locally
                //Step 2.
                //create new course with the information that is required for the minimum creating
                //Step 3:
                //show details
            }
          };
          
          //previous step
          scope.decrementStep = function() {
            if ( scope.hasPreviousStep() )
            {
              var stepIndex = scope.getCurrentStepIndex();
              var previousStep = stepIndex - 1;
              scope.selection = scope.steps[previousStep];
                //check if any changes are made and ask for update
            }
          };
          
          
          scope.createCourse = function(){
              var course = scope.course;
                Course.create(
                {
                    //how to add creator?
                    status: false,
                    code: scope.code,
                    url: scope.url,
                    name: scope.name,
                    description: scope.description,
                    creator: scope.session_user._id
                }, function(course)
                    {
                        scope.incrementStep();
                        console.log(course[0]);
                        alert(course[0].name);  
                    }
              );  
              // console.log(c);
              // Course.onQueueDone(console.log(c));
            };

        var updateCourse = function(){
            //update existing course
        }
          
      }//end link
    };
  }
]);