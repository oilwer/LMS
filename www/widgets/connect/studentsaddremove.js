app.directive('connectStudentsaddremove', [
  "settings",
  "User", 
  "Course",
  "$routeParams",
  function(
    settings,
    User,
    Course,
    $routeParams
  ) {
      return {
      templateUrl: settings.widgets + 'connect/studentsaddremove.html',
      link: function(scope, element, attrs) {
	      
	   scope.students = [];
	   
	   var AvailableCourses = Course.get();
	   var courseUrl = "";
	   
	   scope.courseSelect = {
		  repeatSelect: null,
		  availableOptions: AvailableCourses  
	   };

	  // scope.selectCourseChanged = function (){
		 // courseUrl = $routeParams.url;
		 // updateGUI();
	   //}
	    courseUrl = $routeParams.url;
	   var onLoad = function(){
	   	  
	   	  scope.course = "";

			Course.get({url: courseUrl}, function(course){ 
			          scope.course = course[0];
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
						//console.log(user);			

					  	if(user[i].courses.length > 0)
					  	{
						  	//console.log(user[i]);
						  	//console.log("yolo", courseUrl);
		
						  	for (var x = 0; x < user[i].courses.length; x++)
						  	{

								if(user[i].courses[x].url === courseUrl)
								{
							  		console.log("Dont add", user[i].email);
							  		scope.studentsToBeAdded.push(user[i]);
							  		break;
						  		}
						  		else
						  		{
							  		console.log("Add", user[i].email);
							  		scope.students.push(user[i]);
							  		break;
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

