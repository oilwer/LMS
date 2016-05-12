module.exports = function(modelName, method, query, rbody) {

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

		// Not admin
		else
		{
/*


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
			*/

			return true;
		}

	}

	return false;

};
