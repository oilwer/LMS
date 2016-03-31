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
          
	  		
	      
	      
	    User.get({},function(users){
		  	scope.students = users;
		});
		
			
		Course.get({name: "epiccourse", _populate:"students"},function(course){
			console.log(course[0].students);
		  	scope.studentsToBeAdded = course[0].students;
		});
	                
          // scope.studentsToBeAdded = [];

          
          // Add Item to Checked List and delete from Unchecked List
    scope.stageMeToCourse = function (index) {
	    
	    alert(index);
	    
	  //  scope.studentsToBeAdded.push(scope.students[index]);
	    
	    Course.get({name: "epiccourse"},function(course){
	              			            
						 	
						 	Course.update({_relate:{items:course[0],students:scope.studentsToBeAdded}},function(res){
						 		console.log(res);
						 		console.log("updated");
						 		
						 		User.update({_relate:{items:scope.studentsToBeAdded[index],courses:course[0]}},
						 		function(newres)
						 		{
							 		console.log(newres);
							 	});

						 	});
		             
	              });

	    
        
        scope.students.splice(index, 1);
    };
    
              // Add Item to Checked List and delete from Unchecked List
    scope.unstageMeToCourse = function (index) {
	    
	    console.log(index);
	    
	     scope.students.push(scope.studentsToBeAdded[index]);
	    	    
    	Course.update(
        	{name: "epiccourse"},
        	{ $pull: { 'students': scope.studentsToBeAdded[index]._id}}, function(res)
        	{
	        	console.log(res);
        	}
    	);
	    
        
        scope.studentsToBeAdded.splice(index, 1);
    	};
    
		    	
	    }
	    
	    }

}
]);

