app.directive('connectStudentsaddremove', [
  "settings",
  "User",
  "Course",
  "$routeParams",
  "ChatService",
  "$location",
  function(
    settings,
    User,
    Course,
    $routeParams,
    ChatService,
    $location
  ) {
      return {
      templateUrl: settings.widgets + 'connect/studentsaddremove.html',
      link: function(scope, element, attrs) {

        scope.students = [];

        scope.AvailableCourses = Course.get();
        var courseUrl = "";

        var createNotification = function(UserIdentifier){
         User.update({
             _id: UserIdentifier
         },{ $push: {
               notifications:{
                 url: "courseurl",
                 is_viewed: false,
                 title: "Added to course XXXX",
                 text: "You were added to course XXX!"
               }
           }
         });
        }

        var joinChannel = function(channelName, UserIdentifier){
  	      console.log(channelName, UserIdentifier);
          ChatService.joinChannel(channelName, UserIdentifier).success(function(response){
              console.log("Response", response);
          });
        }

        var leaveChannel = function(channelId, UserIdentifier){
     	    console.log(channelId, UserIdentifier);
          ChatService.leaveChannel(channelId, UserIdentifier).success(function(response){
            console.log("Response", response);
          });
        }

        scope.courseSelect = {
          repeatSelect: null,
          availableOptions: scope.AvailableCourses
        };

        courseUrl = $location.path().split(/[\s/]+/)[2];

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
			    scope.studentsToBeAdded= [];
  		  	if(courseUrl===""){

  		  	}else{
  			  	User.get({_populate:"courses"},function(user){
  				  	for(var i = 0; i < user.length; i++) {
					  	  if(user[i].courses.length > 0) {
						  	  var added = false;
						  	  for (var x = 0; x < user[i].courses.length; x++) {
    								if(user[i].courses[x].url === courseUrl) {
    							  	scope.studentsToBeAdded.push(user[i]);
    							  	added = true;
    							  	break;
    						  	}
						  	  }
  						  	if(!added){
  							  	scope.students.push(user[i]);
  						  	}
					  	  } else {
					  		  scope.students.push(user[i]);
					  	  }
				  	  }
			  	  });

    				Course.get({url: courseUrl, _populate:"students"},function(course){
    					scope.studentsToBeAdded = "";
    				  scope.studentsToBeAdded = course[0].students;
    				});
    	    }
	     }
	       //calls updateGUI on page load
        onLoad();

        var updateDropdownCourseList = function(){
       		//list of courses for dropdown menu
       		scope.dropDownCourseList = [];
  				//loop through list of all courses
  				for (var i = 0; i < scope.AvailableCourses.length; i++) {
  					//if we are not in that course's page, add the course to the dropdown menu
  					if(scope.AvailableCourses[i].url != scope.courseUrl){
  						scope.dropDownCourseList.push(scope.AvailableCourses[i]);
  					}
				  }
        }

        //filters studentlist according to registered courses
        scope.filterByCourse = function(student) {
      	  updateDropdownCourseList();
          if(scope.byCourse === '' || scope.byCourse === null ||scope.byCourse === undefined) return true;
    			return student.courses.filter(function(course) {
		    	  //if course name entered
		      	return course.name.toLowerCase().indexOf(scope.byCourse.toLowerCase()) > -1 //returns a bool
		      	  //if course code entered
		      		|| course.code.toLowerCase().indexOf(scope.byCourse.toLowerCase()) > -1 //returns a bool
		      	  //if student name entered
		      		|| student.last_name.toLowerCase().indexOf(scope.byCourse.toLowerCase()) > -1 //returns a bool
		      		|| student.first_name.toLowerCase().indexOf(scope.byCourse.toLowerCase()) > -1; //returns a bool
			    }).length > 0; //returns a bool
		  	}

        // Add Item to Checked List and delete from Unchecked List
  	    scope.stageMeToCourse = function (index) {
  			  scope.studentsToBeAdded.push(scope.students[index]);

  		    Course.get({url: courseUrl},function(course){
    			 	Course.update({_relate:{items:course[0],students:scope.studentsToBeAdded}},function(res){
              User.update({_relate:{items:scope.students[index],courses:course[0]}},function(newres){
  				 		  //Add User to slack channel:
    				 		if(scope.students[index].slack_token != undefined) {
    				 			joinChannel(course[0].code, scope.students[index].email);
    				 		}
                createNotification(scope.students[index]._id);
    				 		scope.students.splice(index, 1);
  				 	  });
  			 	  });
          });
  	    }

  	    // Add Item to Checked List and delete from Unchecked List
  	    scope.unstageMeToCourse = function (index) {
  		    // Remove user from course
      	  Course.get({url: courseUrl, _populate: "slack_channels"}, function(course){
  	    	  Course.update({url: courseUrl},
          	{ $pull: { 'students': scope.studentsToBeAdded[index]._id}}, function(res){
  	        	User.update({_id: scope.studentsToBeAdded[index]._id},
  					  { $pull: { 'courses': course[0]._id}}, function(rnes){
                User.get({ _id: scope.studentsToBeAdded[index]._id}, function(user){
                  //TODO: For now each course has one channel, when we
      						//have more channels on course, find the course code for
      						//current course
      						if(scope.studentsToBeAdded[index].slack_token != undefined){
      							leaveChannel(course[0].slack_channels[0].channelId, scope.studentsToBeAdded[index].email);
      						}
      						scope.students.push(user[0]);
      						scope.studentsToBeAdded.splice(index, 1);
                });
  					  });
  				  });
      	  });
      	}
  	  }
    }
  }
]);
