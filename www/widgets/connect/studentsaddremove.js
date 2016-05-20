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
          scope.students = [];
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
        scope.AvailableCourses = Course.get({}, function(courses){
          updateDropdownCourseList();
        });


        var changedFilterFunc = function(byCourse){
          console.log("testing", byCourse);
          scope.studentsToBeAdded= [];
          scope.students = [];
  		  	if(courseUrl===""){
            console.log("Empty URL")
  		  	}else{
  			  	User.get({_populate:"courses"},function(user){
              console.log("doing get")
  				  	for(var i = 0; i < user.length; i++) {
					  	  if(user[i].courses.length > 0) {
						  	  var added = false;
                  var second = false;
						  	  for (var x = 0; x < user[i].courses.length; x++) {
    								if(user[i].courses[x].url === courseUrl) {
    							  	scope.studentsToBeAdded.push(user[i]);
    							  	added = true;
                      second = true;
    							  	break;
    						  	}
						  	  }
                  for (var x = 0; x < user[i].courses.length; x++) {
                    console.log("second for ", user[i].courses[x].name, byCourse)
    								if(user[i].courses[x].name === byCourse && second != true) {
    							  	scope.students.push(user[i]);
                      console.log("added to students ", user[i]);
    							  	break;
    						  	}
						  	  }
					  	  }
				  	  }
			  	  });

    				Course.get({url: courseUrl, _populate:"students"},function(course){
    					scope.studentsToBeAdded = "";
    				  scope.studentsToBeAdded = course[0].students;
    				});
    	    }
        }

        scope.changedFilter = function(byCourse) {
          if(scope.byCourse != undefined && scope.byCourse != ""){
            changedFilterFunc(byCourse);
          } else {
            updateGUI();
          }
        }

        // Add Item to Checked List and delete from Unchecked List
  	    scope.stageMeToCourse = function (index, student) {
          console.log(student.first_name, "new stuff 1");

  			  scope.studentsToBeAdded.push(student);
          var participant;
          User.get({ _id: student._id },function(user){
            participant = student;
            Course.get({url: courseUrl},function(course){
      			 	Course.update({_relate:{items:course[0],students:scope.studentsToBeAdded}},function(res){
                User.update({_relate:{items:participant,courses:course[0]}},function(newres){
    				 		  //Add User to slack channel:
      				 		if(participant.slack_token != undefined) {
      				 			joinChannel(course[0].code, participant.email);
      				 		}
                  //createNotification(scope.students[index]._id);
                  for(var i = 0; i < scope.students.length; i += 1) {
              			if(scope.students[i]._id === student._id) {
              					scope.students.splice(i, 1);
              			}
              		}

    				 	  });
    			 	  });
            });
          });
  	    }

  	    // Add Item to Checked List and delete from Unchecked List
  	    scope.unstageMeToCourse = function (index, studenttoPull) {
          console.log(studenttoPull, "new stuff 2");
  		    // Remove user from course
      	  Course.get({url: courseUrl, _populate: "slack_channels"}, function(course){
  	    	  Course.update({url: courseUrl},
          	{ $pull: { 'students': studenttoPull._id}}, function(res){
  	        	User.update({_id: studenttoPull._id},
  					  { $pull: { 'courses': course[0]._id}}, function(rnes){
                User.get({ _id: studenttoPull._id}, function(user){
                  //TODO: For now each course has one channel, when we
      						//have more channels on course, find the course code for
      						//current course
      						if(user.slack_token != undefined){
      							leaveChannel(course[0].slack_channels[0].channelId, studenttoPull.email);
      						}
                  if(scope.byCourse != undefined && scope.byCourse != ""){
                    changedFilterFunc(scope.byCourse);
                  } else{
                    scope.students.push(user[0]);
                    for(var i = 0; i < scope.studentsToBeAdded.length; i += 1) {
                			if(scope.studentsToBeAdded[i]._id === studenttoPull._id) {
                					scope.studentsToBeAdded.splice(i, 1);
                			}
                		}
                  }
                });
  					  });
  				  });
      	  });
      	}
  	  }
    }
  }
]);
