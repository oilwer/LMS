module.exports = function(app) {
	
		// get an instance of mongoose and mongoose.Schema
		var mongoose = require('mongoose');
	
		var db = require('../mongoose-models/user'); 


	//	console.log("db:");
	//	console.log(db(mongoose));
		
	
		app.get('/api/login/:email/:password', function(req, res) {
			
			// Then try to find one in the DB
			db.findOne({ 'email': req.params.email, 'password': req.params.password },  function (err, user) {
			
				// DB error
				if (err) return handleError(err);
			
				// If the result exists (User found)
				if(user) {

					//TODO: Log into textfile instead?
					console.log(user.first_name + ' logged in.');

					// Sets the return value to true
					callback(null, user);
				}	
				
				// No user found
				else {
					console.log(email + ' tried to log in: Incorrect email or password.'); 
					// Return false
					callback(null, false);
				}
			});
			
			res.send("stuff " + req.params.email + " ... .. " + req.params.password); 
		});
	
	}