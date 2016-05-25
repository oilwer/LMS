app.directive('adminParticipantsmanager', [
  "settings",
  "User",
  "Course",
  "$routeParams",
  "SessionService",
    "$location",
  function(
    settings,
    User,
    Course,
    $routeParams,
    SessionService,
     $location
  ) {

    return {
      templateUrl: settings.widgets + 'admin/participantsmanager.html',
      link: function(scope, element, attrs) {

        SessionService.getSession().success(function(response){
          if(response.user.role == "student"){
            scope.showParticipants = false;
          } else {
            scope.showParticipants = true;
          }
        });

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
          ChatService.joinChannel(channelName, UserIdentifier).success(function(response){
          });
        }

        var leaveChannel = function(channelId, UserIdentifier){
          ChatService.leaveChannel(channelId, UserIdentifier).success(function(response){
          });
        }

        scope.courseSelect = {
          repeatSelect: null,
          availableOptions: scope.AvailableCourses
        };

        courseUrl = $location.path().split(/[\s/]+/)[2];

  	    scope.courseUrl = courseUrl;

        var onLoad = function(){
          scope.studentsToBeAdded= [];
          scope.students = [];

          User.get({_populate:"courses"},function(user){
            for(var i = 0; i < user.length; i++) {
                scope.students.push(user[i]);
            }
          });
        }

		    var updateGUI = function(){
			    scope.studentsToBeAdded= [];
          scope.students = [];
          courseName = scope.byCourseRight;
  		  	if(courseName===""){

  		  	}else{
  			  	User.get({_populate:"courses"},function(user){
  				  	for(var i = 0; i < user.length; i++) {
					  	  if(user[i].courses.length > 0) {
						  	  var added = false;
						  	  for (var x = 0; x < user[i].courses.length; x++) {
    								if(user[i].courses[x].name === courseName) {
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

    				Course.get({name: courseName, _populate:"students"},function(course){
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
  						scope.dropDownCourseList.push(scope.AvailableCourses[i]);
				  }
        }
        scope.AvailableCourses = Course.get({}, function(courses){
          updateDropdownCourseList();
        });



        scope.changedFilterRight = function(byCourse) {
            updateGUI();
        }

        // Add Item to Checked List and delete from Unchecked List
  	    scope.stageMeToCourse = function (index, student) {
          if(scope.byCourseRight == "" || scope.byCourseRight == undefined) {
          if(scope.byCourseRight == "" || scope.byCourseRight == undefined) {
            alert("Please select a course to add " + student.first_name + " to!");
            return null;

          } else {

            courseName = scope.byCourseRight
          }
  			  scope.studentsToBeAdded.push(student);
          var participant;
          User.get({ _id: student._id },function(user){
            participant = user;
            Course.get({name: courseName},function(course){
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
            courseName = scope.byCourseRight
  		    // Remove user from course
      	  Course.get({name: courseName, _populate: "slack_channels"}, function(course){
  	    	  Course.update({name: courseName},
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

                  scope.students.push(user[0]);
                  for(var i = 0; i < scope.studentsToBeAdded.length; i += 1) {
              			if(scope.studentsToBeAdded[i]._id === studenttoPull._id) {
              					scope.studentsToBeAdded.splice(i, 1);
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
