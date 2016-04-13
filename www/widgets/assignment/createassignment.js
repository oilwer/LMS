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
      link: function(scope, element, attrs, $location) {
        
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
          

          
        //get session_user
        scope.session_user;
        SessionService.getSession().success(function(response){
            scope.session_user = response.user;
        });
          

        // Updates the GUI according to edit/add-state
        var isEditing = false;
        scope.btnAddOrUpdate = 'Create assignment';
        
        var stepFinishedIndex = 0;
        
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
        scope.addOrUpdateCourse = function()
        {
	        

	        
	        if (typeof selectedCourseName !== 'undefined') 
	        {
		        
		        if (typeof scope.assignment.obligatory !== 'undefined') 
				{
					
				}
				else
				{
					scope.assignment.obligatory = false;		
				}
				
				if( typeof scope.assignment.name !== 'undefined')
				{
					
					if( typeof scope.assignment.due_date !== 'undefined')
					{
	
					    var result = AvailableCourses.filter(function( obj ) {
							return obj.name == selectedCourseName;
						});
							
							
						scope.assignment.course = result[0]._id;
							
						scope.assignment.added_on = (new Date()).toJSON();
				
					       
					    
					       
				        if(!isEditing)
				        {
				              console.log("Creating assignment");
				              
				              Assignment.create(scope.assignment, function(res){
					          		Course.get({ _id: res[0].course}, function(x){
							  		Course.update({_relate:{items:x[0],assignments:res[0] }});
							  		Assignment.update({_relate:{items:res[0],course:x[0]}});
		                    		});
					          scope.incrementStep();
					          isEditing = true;
					          });
						}
				        else
				        {
				        	console.log("Updating assignment");
				        }
			    	}
			    	else
			    	{
				    	console.log("You need to specify a due date");
			    	}
			    }
			    else
			    {
				    console.log("Assignment name undefined");
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
          },
          {
              name: "Select course",
              icon: "fa-leaf",
          },
          {
              name: "Details",
              icon: "fa-i-cursor",
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
	        
	        // If you are going backwards in the flow: No worries
	        if(scope.getCurrentStepIndex() > index)
	        {
	        	console.log("Moving to step:", index, " from step:", scope.getCurrentStepIndex());
				scope.selection = scope.steps[index].name;
			}
			// Going forwards in the flow
			else
			{
				// If you are going to a step that are finished
				if(stepFinishedIndex >= index)
				{
					console.log("Moving to step:", index, " from step:", scope.getCurrentStepIndex());
					scope.selection = scope.steps[index].name;
				}
				
			}
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
              
              if(stepIndex >= stepFinishedIndex)
              {
	              console.log("Step ", stepFinishedIndex, " done");
              	stepFinishedIndex++;
              }

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
        scope.pathLocation = function(assignment) {
	        
            //add if statement for previous location - get prev path and back-forward
            
            Assignment.get({name: assignment.name, added_on: assignment.added_on, due_date: assignment.due_date,_populate:"course"}, function(fetchedAssignment){
		  		 console.log(fetchedAssignment);
		  		 
		  		 scope.$parent.hideModal();
		  		 $window.location.href = '/courses/' + fetchedAssignment[0].course.name + "/assignment/" + fetchedAssignment[0]._id;
		  		//$location.path(fetchedAssignment._id);
		  		
	       });
            
            /* Assignment.create(scope.assignment, function(res){
				          		Course.get({ _id: res[0].course}, function(x){
						  		Course.update({_relate:{items:x[0],assignments:res[0] }});
						  		Assignment.update({_relate:{items:res[0],course:x[0]}});
	                    		});
				          scope.incrementStep();
				          });
            
            */
            
           // console.log(assignment);
          //  $location.path(newLocation);
          //  scope.$parent.hideModal();
        }
            

      }//end link
    };
  }
]);