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
			 		console.log(scope.students[index]);
				 		if(scope.students[index].slack_token != undefined){
				 			joinChannel(course[0].code, scope.students[index].email);
				 		}
            createNotification(scope.students[index]._id);
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

    	Course.get({url: courseUrl, _populate: "slack_channels"}, function(course){
	    	console.log(course);
	    	Course.update(
        	{url: courseUrl},
        	{ $pull: { 'students': scope.studentsToBeAdded[index]._id}}, function(res){

	        	//console.log(res);


	        	User.update(
					{_id: scope.studentsToBeAdded[index]._id},
					{ $pull: { 'courses': course[0]._id}}, function(rnes){

						//TODO: For now each course has one channel, when we
						//have more channels on course, find the course code for
						//current course
						if(scope.studentsToBeAdded[index].slack_token != undefined){
							leaveChannel(course[0].slack_channels[0].channelId, scope.studentsToBeAdded[index].email);
						}

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
