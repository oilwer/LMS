// app/js/models/user.js

// Constructor
var User = function (data) {  
    this.data = data;
}

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using User.DB (User is a object w/ db as a property) 
User.db = mongoose.model('User', new Schema({ 
    username: String, 
    password: String
}));

// Login function. Callback is the variable that returns the value
User.login = function (username, password, callback) {  
   	
   					
			if( (username !== "") && (password !== ""))
			{
			
				if( (username !== null) && (password !== null))
				{
			    
					User.db.findOne({ 'username': username, 'password': password },  function (err, user) {
					if (err) return handleError(err);
				
					if(user)
					{
						console.log(username + ' logged in.'); 
						callback(null, true);
					}	
					else
					{
						console.log(username + ' tried to log in: Incorrect username or password.'); 
						callback(null, false);
					}
					});
			
				}
			}
					
        
    
}

// Exports the object as a whole
module.exports = User;

