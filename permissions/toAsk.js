module.exports = function(modelName, method, query, rbody) {

	var mongoose = require('mongoose');
	var Assignment = mongoose.model('Assignment');
	var Resource = mongoose.model('Resource');

	function findWithAttr(array, attr, value) {
		for(var i = 0; i < array.length; i += 1) {
			if(array[i][attr] === value) {
					return i;
			}
		}
	}

	// If somebody not logged in trying to do API calls - block them
	if(rbody.session.user == undefined)
	{
		console.log("ToAsk: Blocked API access from unauthorized user");
		return false;
	}

	// If logged in
	else if(rbody.session.user != undefined)
	{
		// If admin - Allow anything
		if(rbody.session.user.role == "admin")
		{
			return true;
		}

		// Student
		else if(rbody.session.user.role == "student")
		{

			if(modelName == "User")
			{

				// If the current user want's to FULL: GET or EDIT his own data
				if(query._id == rbody.session.user._id)
				{
					if(method == "GET")
					{
						console.log("ASK full GET on himself", modelName, method, query);
						return true;
					}

					// User want's to update his DB data
					else if(method == "PUT")
					{
						// The update request does not include the Role or Courses field - IE: It's safe to update.
						if((rbody.body.role == undefined) && (rbody.body.courses == undefined))
						{
							console.log("ASK full PUT on himself", modelName, method, query);
							return true;
						}

						// Update request was dirty (Trying to hack the system)
						else
						{
							console.log("Blocked API access because user tried to change protected data");
						}
					}
				}

				// Current user want's to access somebody else's data
				else
				{
					if(method == "GET")
					{
						console.log("Full get on somebody else OR get all users");

						// It is allowed, but the data will be manipulated before returned.
						return true;
					}
				}
			}

			else if (modelName == "Course") {

				if (method == "GET") {
					return true;
				}

				else if(method == "PUT")
				{
					console.log("Course to update", query._id);

					// User want's to update one of "his" courses
					if(rbody.session.user.courses.indexOf(query._id) != -1)
					{


						var bodystring = JSON.stringify(rbody.body);

						// If the request has "messages" and "push"
						if( (bodystring.indexOf("messages") > -1) && (bodystring.indexOf("$push") > -1))
						{
							// Allow update
							return true;
						}

					}

				//	console.log(rbody.session.user);
				}



			}

			else if(modelName == "Assignment")
			{

				if(method == "GET")
				{
				//	console.log("query: ", query._id);

					return Assignment.findOne({_id: query._id}, function(err, found) {

						//		console.log("found course: ", found.course);

						if(found != null)
						{
								// TODO
		        	// console.log("assignment_Id:", found._id);
							console.log("Courses", rbody.session.user.courses);

							if(findWithAttr(rbody.session.user.courses, "_id", found.course) != -1)
							{
								console.log("user can get assignment");
								return true;

							}
							else {
								return false;
							}
						}
		      });
				}

			}

			else if(modelName == "Resource")
			{
				console.log("resource query: ", query.url);

				// Get all resources
				if(query == undefined)
				{
					return true;
				}

			// Get a specific resource
			else {

					// Check if resource exists
					return Resource.findOne({url: query.url}, function(err, found) {

						if(found == null) return false;

							for (var i = 0; i < rbody.session.user.courses.length; i++) {
								if(found.course == rbody.session.user.courses[i])
								{
									return true;
								}
								else
								{
									return false;
								}
							}

					});

			}

			}

			else if(modelName == "Tag")
			{
					
				return true;

			}

		}

		// teacher
		else if(rbody.session.user.role == "teacher")
		{

			if(modelName == "User")
			{

				// Bara se sina egna kurser
				// Se alla users

				// If the current user want's to FULL: GET or EDIT his own data
				if(query._id == rbody.session.user._id)
				{
					if(method == "GET")
					{
						console.log("ASK full GET on himself", modelName, method, query);
						return true;
					}

					// User want's to update his DB data
					else if(method == "PUT")
					{
						// The update request does not include the Role or Courses field - IE: It's safe to update.
						if((rbody.body.role == undefined) && (rbody.body.courses == undefined))
						{
							console.log("ASK full PUT on himself", modelName, method, query);
							return true;
						}

						// Update request was dirty (Trying to hack the system)
						else
						{
							console.log("Blocked API access because user tried to change protected data");
						}
					}
				}

				// Current user want's to access somebody else's data
				else
				{
					if(method == "GET")
					{
						console.log("Full get on somebody else OR get all users");

						// It is allowed, but the data will be manipulated before returned.
						return true;
					}

					else if(method == "POST")
					{
						return true;
					}

					else if(method == "DELETE")
					{
						console.log("Course to delete", query._id);

						// User want's to update one of "his" courses
						if(rbody.session.user.courses.indexOf(query._id) != -1)
						{
								return true;
						}
					}

					else if(method == "PUT")
					{
						console.log("Course to update", query._id);

						// User want's to update one of "his" courses
						if(rbody.session.user.courses.indexOf(query._id) != -1)
						{
								return true;
						}
					}
				}
			}

			else if (modelName == "Course") {
				if (method == "GET") {
					console.log("Teacher gets courses");
					return true;
				}

				else if(method == "POST")
				{
					return true;
				}


				else if(method == "PUT")
				{
					console.log("Course to update", query._id);

					// User want's to update one of "his" courses
					if(rbody.session.user.courses.indexOf(query._id) != -1)
					{


						var bodystring = JSON.stringify(rbody.body);

						// If the request has "messages" and "push"
						if( (bodystring.indexOf("messages") > -1) && (bodystring.indexOf("$push") > -1))
						{
							// Allow update
							return true;
						}
					}
				}
			}

			else if(modelName == "Assignment")
			{

				if(method == "GET")
				{
				//	console.log("query: ", query._id);

					return Assignment.findOne({_id: query._id}, function(err, found) {

						//		console.log("found course: ", found.course);

								// TODO
		        	// console.log("assignment_Id:", found._id);
							if(findWithAttr(rbody.session.user.courses, "_id", found.course) != -1)
							{
								console.log("user can get assignment");
								return true;

							}
							else {
								return false;
							}
		      		});
				}

				else if(method == "POST")
				{
					return true;
				}


			}

			else if(modelName == "Resource")
			{
				console.log("resource query: ", query.url);


				return Resource.findOne({url: query.url}, function(err, found) {

						//	console.log("found resource's course: ", found.course);

						if(found == null){ 
							return false;
						}


						if(findWithAttr(rbody.session.user.courses, "_id", found.course) != -1)
						{
							console.log("user can get resource");
							return true;
						}
						else {
							return false;
						}
				});
			}

			else if(modelName == "Tag")
			{
					
						return true;

			}

		}


	}

	return false;

};
