app.directive('connectStudentsaddremove', [
  "settings",
  "User", 
  "Course",
  function(
    settings,
    User,
    Course
  ) {
	  
    return {
      templateUrl: settings.widgets + 'connect/studentsaddremove.html',
      link: function(scope, element, attrs) {
	      
	   scope.students = [];
	   
	   var AvailableCourses = Course.get();
	   var courseName = "";
	   
	   
	   scope.courseSelect = {
		  repeatSelect: null,
		  availableOptions: AvailableCourses  
	   };

	   scope.selectCourseChanged = function (){
		  courseName = scope.courseSelect.repeatSelect;
		  updateGUI();
	   }

	  	
		var updateGUI = function(){
			 
			 scope.students= [];
			 scope.studentsToBeAdded= [];
			  	
		  	if(courseName===""){
			  	console.log("select a course dumb guy");
			  	
		  	}else{
		  		
	  	  	
			  	
			  	User.get({_populate:"courses"},function(user){
				  	for(var i = 0; i < user.length; i++)
				  	{
					  	
					  	
					  	if(user[i].courses.length > 0)
					  	{
						  	
						  	console.log(user[i]);
						  	console.log("yolo", courseName);
		
						  	for (var x = 0; x < user[i].courses.length; x++)
						  	{
								if(user[i].courses[x].name === courseName)
								{
							  		console.log("Dont add", user[i].email);
							  		// scope.students.push(user[i]);
						  		}
						  		else
						  		{
							  		console.log("Add", user[i].email);
							  		scope.students.push(user[i]);
						  		}
						  	}
					  	}
					  	
					  	else
					  	{
				  
					  		console.log("Add", user[i].email);
					  		scope.students.push(user[i]);
				  	
					  	}
				  	}
			  	});
	  	
	  	/*
	    User.get({courses: {name: "epiccourse"}, _populate:"courses"},function(users){
		    scope.students = "";
		  	scope.students = users;
		});
		
		*/
					
				Course.get({name: courseName, _populate:"students"},function(course){
					console.log(course[0].students);
					scope.studentsToBeAdded = "";
				  	scope.studentsToBeAdded = course[0].students;
				});
	    	}
	    }
           
          // scope.studentsToBeAdded = [];

          
          // Add Item to Checked List and delete from Unchecked List
	    scope.stageMeToCourse = function (index) {
		    
			scope.studentsToBeAdded.push(scope.students[index]);
		    
		    Course.get({name: courseName},function(course){
			               
							 	
							 	Course.update({_relate:{items:course[0],students:scope.studentsToBeAdded}},function(res){
							 		console.log(res);
							 		console.log("updated");
							 		
							 		// console.log(scope.studentsToBeAdded);
							 		
							 		User.update({_relate:{items:scope.students[index],courses:course[0]}},function(newres){
								 		console.log(newres);
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
    	
    	Course.get({name: courseName}, function(course){
	    
	    	Course.update(
        	{name: courseName},
        	{ $pull: { 'students': scope.studentsToBeAdded[index]._id}}, function(res){
	        	
	        	console.log(res);
	        	
	        	
	        	User.update(
					{_id: scope.studentsToBeAdded[index]._id},
					{ $pull: { 'courses': course[0]._id}}, function(rnes){
						
						scope.students.push(scope.studentsToBeAdded[index]);
						scope.studentsToBeAdded.splice(index, 1);
						console.log(rnes);
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

