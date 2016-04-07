app.directive('assignmentCreateassignment', [
    "settings",
    "$location",
    "$window",
    "Course",
    "Assignment",
    "SessionService",
  function(
    settings,
    $location,
    $window,
    Course,
    Assignment,
    SessionService
  ) {
        
    return {
      templateUrl: settings.widgets + 'assignment/createassignment.html',
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
          
        //get session_user
        scope.session_user;
        SessionService.getSession().success(function(response){
            scope.session_user = response.user;
        });
          

        // Updates the GUI according to edit/add-state
        var isEditingCourse = false;
        scope.btnAddOrUpdate = 'Create assignment';
        
        var AvailableCourses = Course.get();
        
        scope.courseSelect = {
		  repeatSelect: null,
		  availableOptions: AvailableCourses  
	   };
        
        scope.selectCourseChanged = function (){
	        
	        if(scope.assignment === undefined)
	        {
		        scope.assignment = "";
	        }
	        
			selectedCourseName = scope.courseSelect.repeatSelect;
				  
			console.log(selectedCourseName);

			

		  // updateGUI();
	   }
	   
	   
          
        //Gui function add course
        scope.addOrUpdateCourse = function(){
	        
	        if (typeof selectedCourseName !== 'undefined') 
	        {
			        
			        var result = AvailableCourses.filter(function( obj ) {
						return obj.name == selectedCourseName;
					});
					
					
					scope.assignment.course = result[0]._id;
					
					scope.assignment.added_on = (new Date()).toJSON();
		
			       
			       console.log(scope.assignment);
			       
		          if(!isEditingCourse){
		              console.log("create assignment runs");
		              
		              
		              Assignment.create(scope.assignment, function(res){
			              
			              Course.get({ _id: res[0].course}, function(x){
                      Course.update({_relate:{items:x[0],assignments:res[0] }});
                      Assignment.update({_relate:{items:res[0],course:x[0]}});
                    });
			              scope.incrementStep();
			              });


		              
		            
		          }
		          else{
		              console.log("update assignment runs");
		          }
          
          }
          else
          {
	          alert("Please select a course before you add an assignment");
          }
        }
        
          
        scope.steps = [{
              name: "Create or copy",
              icon: "fa-file-text-o",
          },{
              name: "Details",
              icon: "fa-i-cursor",
          },
          {
              name: "Select course",
              icon: "fa-leaf",
          },
          {
              name: "Preview",
              icon: "fa-eye",
          }
          ];
          
        //start out on step
        scope.selection = scope.steps[0].name;

        scope.getCurrentStepIndex = function(){
        // Find index of the current step by object name
            for(var i = 0; i < scope.steps.length; i += 1) {
                if(scope.steps[i].name === scope.selection) {
                    return i;
                }
            }
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

        //roate location
        scope.pathLocation = function(newLocation) {
            //add if statement for previous location - get prev path and back-forward
            console.log(newLocation);
            $location.path(newLocation);
            scope.$parent.hideModal();
        }
            

      }//end link
    };
  }
]);