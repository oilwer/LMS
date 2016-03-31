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
        
        var session_user;
        SessionService.getSession().success(function(response){
            session_user = response.user;
        });
          
          

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
          
         scope.incrementStep = function() {
            if ( scope.hasNextStep() )
            {
              var stepIndex = scope.getCurrentStepIndex();
              var nextStep = stepIndex + 1;
              scope.selection = scope.steps[nextStep];
            }
          };

          scope.decrementStep = function() {
            if ( scope.hasPreviousStep() )
            {
              var stepIndex = scope.getCurrentStepIndex();
              var previousStep = stepIndex - 1;
              scope.selection = scope.steps[previousStep];
            }
          };
          
      }//end link
    };
  }
]);