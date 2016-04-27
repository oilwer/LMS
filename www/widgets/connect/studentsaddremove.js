app.directive('connectStudentsaddremove', [
  "settings",
  "User", 
  "Course",
  "$routeParams",
  "ChatService",
  function(
    settings,
    User,
    Course,
    $routeParams,
    ChatService
  ) {
      return {
      templateUrl: settings.widgets + 'connect/studentsaddremove.html',
      link: function(scope, element, attrs) {
	      
	   scope.students = [];
	   
	   var AvailableCourses = Course.get();
	   var courseUrl = "";

	   var joinChannel = function(channelName, UserIdentifier){
          ChatService.joinChannel(channelName, UserIdentifier).success(function(response){
            console.log("Response", response);
          });
        }

        var leaveChannel = function(channelName, UserIdentifier){
          Channel.get({name: scope.channelName}, function(returnedChannel){
            ChatService.leaveChannel(returnedChannel[0].channel_id, UserIdentifier).success(function(response){
              console.log("Response", response);
            });
          });
        }
	   
	   scope.courseSelect = {
		  repeatSelect: null,
		  availableOptions: AvailableCourses  
	   };

	  // scope.selectCourseChanged = function (){
		 // courseUrl = $routeParams.url;
		 // updateGUI();
	   //}
	    courseUrl = $routeParams.url;
	    scope.courseUrl = courseUrl;
	   var onLoad = function(){
	   	  
	   	  scope.course = "";

			Course.get({url: courseUrl}, function(course){ 
			          scope.course = course[0];
			          Course.get({ url: courseUrl , _populate:"assignments"}, function(res){
			      		  scope.assignments = res[0].assignments;
			      	  });
			          updateGUI();
			      });
		  
	   }
	  
	    
		
		var updateGUI = function(){
			 
			 scope.students= [];
			 scope.studentsToBeAdded= [];
			  	
		  	if(courseUrl===""){
			  	console.log("select a course dumb guy");
			  	
		  	}else{
			  	
			  	User.get({_populate:"courses"},function(user){
				  	for(var i = 0; i < user.length; i++)
				  	{

					  	if(user[i].courses.length > 0)
					  	{

						  	var added = false;
						  	for (var x = 0; x < user[i].courses.length; x++)
						  	{
								if(user[i].courses[x].url === courseUrl)
								{
							  		scope.studentsToBeAdded.push(user[i]);
							  		added = true;
							  		break;
						  		}
						  		
						  	}

						  	if(!added){
							  	scope.students.push(user[i]);
						  	}
					  	}
					  	
					  	else
					  	{
					  		scope.students.push(user[i]);
					  	}
				  	}
			  	});
					
				Course.get({url: courseUrl, _populate:"students"},function(course){
					//console.log(course[0].students);
					scope.studentsToBeAdded = "";

					//var students = User.get({role:Student});
					//console.log(students);
				  	scope.studentsToBeAdded = course[0].students;
				  	console.log(course[0]);
				});
	    	}
	    }
	       //calls updateGUI on page load
           onLoad();

          // scope.studentsToBeAdded = [];

          
          // Add Item to Checked List and delete from Unchecked List
	    scope.stageMeToCourse = function (index) {
		    
			scope.studentsToBeAdded.push(scope.students[index]);
		    
		    Course.get({url: courseUrl},function(course){
			               
			 	Course.update({_relate:{items:course[0],students:scope.studentsToBeAdded}},function(res){
			 		//console.log(res);
			 		//console.log("updated");
			 		
			 		// console.log(scope.studentsToBeAdded);
			 		
			 		User.update({_relate:{items:scope.students[index],courses:course[0]}},function(newres){
				 		//console.log(newres);
				 		//Add User to slack channel:
				 		joinChannel(course.code, scope.students[index].email);

				 		scope.students.splice(index, 1);
				 	});
			 	});
            });
	    };
	    
	              // Add Item to Checked List and delete from Unchecked List
	    scope.unstageMeToCourse = function (index) {
	    
	    // console.log(index);
	    
	    // scope.students.push(scope.studentsToBeAdded[index]);
	   
		// Remove user from course
    	
    	Course.get({url: courseUrl}, function(course){
	    
	    	Course.update(
        	{url: courseUrl},
        	{ $pull: { 'students': scope.studentsToBeAdded[index]._id}}, function(res){
	        	
	        	//console.log(res);
	        	
	        	
	        	User.update(
					{_id: scope.studentsToBeAdded[index]._id},
					{ $pull: { 'courses': course[0]._id}}, function(rnes){
						
						leaveChannel(course.code, scope.studentsToBeAdded[index].email);
						
						scope.students.push(scope.studentsToBeAdded[index]);
						scope.studentsToBeAdded.splice(index, 1);
						//console.log(rnes);
					}
				);
				
        	
				}
			);
	    	
    	});
    	
    	
	    
        
        
    	};
    
		    	
	    }
	    
	    }

}
]);

