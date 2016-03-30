module.exports = function(modelName, method, query, rbody) {
	
	// If somebody not logged in trying to do API calls - block them
	if((rbody.session.user == undefined))
	{
		console.log("Blocked API access from unauthorized user");
		return false;
	}
	
	// If logged in
	if(rbody.session.user != undefined)
	{
		// If admin - Allow anything
		if(rbody.session.user.role == "admin")
		{
			return true;
		}
		
		// Not admin
		else
		{
				
			if(method == "GET")
			{
				// If the current user want's to get his own profile
				if(query._id == rbody.session.user._id)
				{
					console.log("ASK full get on himself", modelName, method, query);
					return true;
				}	
				
				// Current user want's to get somebody else's profile
				else
				{
					console.log("Full get on somebody else OR get all users");
					return false;
				}
			} 
		}
		
	}

};