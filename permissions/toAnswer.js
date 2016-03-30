module.exports = function(modelName, method, query, req, result) {
	
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
		if(req.session.user.role == "admin")
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
		else
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
					else if(query._id == req.session.user._id)
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
	}
	
  result = "";
  return true;
};