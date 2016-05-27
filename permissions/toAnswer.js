module.exports = function(modelName, method, query, req, result) {

	function findWithAttr(array, attr, value) {
		for(var i = 0; i < array.length; i += 1) {
			if(array[i][attr] === value) {
					return i;
			}
		}
	}

	// If somebody not logged in trying to recieve API calls - block them
	if(req.session.user == undefined)
	{
		console.log("ToAnswer: Blocked API access from unauthorized user");
		result = "";
		return true;
	}

	// If logged in
	else if(req.session.user != undefined)
	{

		// If admin - Allow anything
		if(req.session.user.role == "admin" || req.session.user.role == "teacher")
		{
			if(method == "GET")
			{
				// No query specifyed, Get all users
				if(query._id == undefined)
				{
					if(result.length == 0)
					{
						console.log("No results");
					}

					else
					{
						// For each user, remove protected data
						for (var i = 0; i < result.length; i++)
						{
							result[i].password = undefined;
						}
					}
				}

				 // Admin gets his own data
				else if(query._id == req.session.user._id)
				{
					result.password = undefined;
				}
			}
		}

		// If not admin
		else if(req.session.user.role == "student")
		{
			if(modelName == "User")
			{

				if(method == "GET")
				{

					// No query specifyed, Get all users
					if(query._id == undefined)
					{

						if(result.length == 0)
						{
							console.log("No results");
						}

						else
						{
							// For each user, remove protected data
							for (var i = 0; i < result.length; i++)
							{
								result[i]._id = undefined;
								result[i].__v = undefined;
								result[i].email = undefined;
								result[i].password = undefined;
								result[i].role = undefined;
								result[i].phone_number = undefined;
								result[i].personality = undefined;
								result[i].plugs = undefined;
								result[i].courses = undefined;
								result[i].password = undefined;
								result[i].assignments = undefined;
								result[i].experiences = undefined;
								result[i].slack_token = undefined;
								result[i].skills = undefined;
								result[i].notifications = undefined;
								result[i].courses_pinned = undefined;
							}
						}
					}

					 // User gets his own data
					else if(query._id == req.session.user._id)
					{
						console.log("i want to get my own data");
						result.password = undefined;
					}

					// User gets somebodys elses data
					else if(query._id != req.session.user._id)
					{
						// For each user, remove protected data
						for (var i = 0; i < result.length; i++)
						{
							// Remove protected data
							result[i]._id = undefined;
							result[i].__v = undefined;
							result[i].email = undefined;
							result[i].password = undefined;
							result[i].role = undefined;
							result[i].phone_number = undefined;
							result[i].personality = undefined;
							result[i].plugs = undefined;
							result[i].courses = undefined;
							result[i].password = undefined;
						}
					}


				}
			}

			else if(modelName == "Course")
			{
				if(method == "GET")
				{
					// Get all courses
					if(query._id == undefined)
					{
						// For each course, remove protected data
						for (var i = 0; i < result.length; i++)
						{
							// For each course the user has access to
							for (var x = 0; x < req.session.user.courses.length; x++)
							{
									// if the user dont have the resource's course in his course list
									if(result[i]._id != req.session.user.courses[x])
									{
										result[i] = null;
									}
							}
						}
					}
				}
			}

			else if(modelName == "Resource")
			{
					// Get all resources
					if(query._id == undefined)
					{

						if(result.length == 0)
						{
							console.log("No results");
						}

						else{
							// For each resource, remove protected data
							for (var i = 0; i < result.length; i++)
							{

								// For each course the user has access to
								for (var x = 0; x < req.session.user.courses.length; x++) {

									// if the user dont have the resource's course in his course list
									if(result[i].course != req.session.user.courses[x])
									{
										 result[i] = null;
									}
								}

							}
					}
			}

			// Get a specific resource
			else {

			}

		}

	}

}
  return true;

};
