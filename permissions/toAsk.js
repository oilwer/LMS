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
				if(query._id == rbody.session.user._id)
				{
					console.log("ASK full get on himself", modelName, method, query);
					return true;
				}	
				else
				{
					console.log("Full get on somebody else");
					return false;
				}
			} 
		}
		
	}
  
 /* if((modelName == "User") && (method == "GET") && (rbody.session.user == undefined))
  {
	  console.log("We are not logged in");
  }
  */
   // console.log("ask:", modelName, method);
  // return true;
};