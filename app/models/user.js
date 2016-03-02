// app/js/models/user.js

// Constructor
var User = function (data) {  
    this.data = data;
}

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Defines the user Schema (How the DB is structured)
var userSchema = new Schema({ 
    profilePic: String,
  	email: String,
  	first_name: String,
  	last_name: String,
  	description: String,
  	personality: String,
    phone_number: String,
    password: String,
    courses: {
	    course_name: String
	    }
});

// set up a mongoose model and pass it using User.DB (User is a object w/ db as a property) 
User.db = mongoose.model('User', userSchema);

// Login function. Callback is the variable that returns the value
User.login = function (email, password, callback) {  
   	
   			// If email and password is not empty		
			if( (email !== "") && (password !== "")) {
			
				// If they are not null
				if( (email !== null) && (password !== null)) {
			    
			    	// Then try to find one in the DB
					User.db.findOne({ 'email': email, 'password': password },  function (err, user) {
					
					// DB error
					if (err) return handleError(err);
				
					// If the result exists (User found)
					if(user) {
						
						//TODO: Log into textfile instead?
						console.log(user.first_name + ' logged in.'); 
						
						// Sets the return value to true
						callback(null, true);
					}	
					
					// No user found
					else {
						console.log(email + ' tried to log in: Incorrect email or password.'); 
						// Return false
						callback(null, false);
					}
					});
			
				}
			}
					
        
    
}

// Function that returns all users
User.getAllUsers = function (callback){

    User.db.find({}, function(err, users){
        if (err) return console.error(err);
        
        // If the result exists (Users found)
		if(users) {
        	callback(null, users);
        }
        
        // No results found
        else {
	        callback(null, false);
        }
    });
};

// Function that returns a user by ID
User.getById = function(id, callback){
    User.db.findOne ( {_id: id}, function(err, user){
        if (err) return console.error(err);
        
         // If the result exists (User found)
		if(user) {
        	callback(null, user);
        }
        
        // No results found
        else {
	        callback(null, false);
        }
    });
};

//Function that inserts a new user in db
User.register = function (user, callback) {
	
	// Inits user.db object
    var newUser = new User.db({first_name: user.first_name, email: user.email, phone_number: user.phone_number, password: user.password });

	// Save to the mongo DB
    newUser.save ( function(err, response){
        if (err) return console.error(err);
        callback(null, response);
        console.log(response);
    });
};


// Function that removes a user in db by ID
User.remove = function(id, callback){
    
    //send response back to controller
    User.db.remove ( {_id : id}, function(err, response){
        if (err) return console.error(err);
        console.log(response);
        callback(null, response);
    });
};

//Function that modifies selected user
User.modify = function(user, callback){
	
	/*
		    profilePic: String,
  	email: String,
  	first_name: String,
  	last_name: String,
  	description: String,
  	personality: String,
    phone_number: String,
    password: String,
    courses: {
	    course_name: String
	    }
		*/
	
	// Find by id and update user
    User.db.findByIdAndUpdate(user._id, {
	    	first_name: user.first_name, 
			email: user.email, 
	    	phone_number: user.phone_number, 
	    	password: user.password,
	    	description: user.description,
	    	last_name: user.last_name,
	    	personality: user.personality,
	    	courses: user.courses
	    	},{new: true}, function (err, response){ // TODO: What is new: true?
		if (err) return console.error(err);
        console.log(response);
        callback(null, response);
    });
};


// Exports the object as a whole
module.exports = User;

