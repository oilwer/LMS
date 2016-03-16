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
	public_url: String,
    courses: {
	    course_name: String
	    },
    role: String //student/admin/teacher
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
					callback(null, user);
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
        
        //TODO: users is always true, check if elements exist in array instead
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
			console.log('User does not exist');
			callback(null, false);
        }
    });
};

// Function that returns a user by public URL
User.getByPublicURL = function(public_url, callback){
    User.db.findOne ( {public_url: public_url}, function(err, user){
        if (err) return console.error(err);

         // If the result exists (User found)
		if(user) {
        	callback(null, user);
			console.log('Profile fetched; email: %s', user.id);
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
    var newUser = new User.db({role: user.role, first_name: user.first_name, 
    	last_name: user.last_name, email: user.email, phone_number: 
    	user.phone_number, password: user.password, description: user.description,
    	personality: user.personality, public_url: user.public_url });
    
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

	// Find by id and update user
    User.db.findByIdAndUpdate(user._id, {
	    	role: user.role,
	    	first_name: user.first_name,
			last_name: user.last_name,
			email: user.email, 
	    	phone_number: user.phone_number, 
	    	password: user.password,
	    	description: user.description,
	    	personality: user.personality,
	    	courses: user.courses,
			public_url: user.public_url
	    	},{new: true}, function (err, response){ // TODO: What is new: true?
		if (err) return console.error(err);
        console.log(response);
        callback(null, response);
    });
};

//Create random 8 character string
var randomPassword = function(max, min){
    var newPass = "";
    for (var i = 0; i < 4; i++) {
        var num = Math.floor(Math.random()*(max-min+1)+min);
        var letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        newPass += num.toString();
        newPass += letter;
    };
    return newPass;
}

//Reset a user password, identifies with parameter "email"
User.resetPassword = function(email, callback){
      var newPass = randomPassword(1, 9);
      User.db.findOneAndUpdate( { "email" : email }, {
            password: newPass
            },{new: true}, function (err, response){ 
        if (err) return console.error(err);
        User.sendPasswordReset(email, newPass);
        callback(null, true);
    }); 
 };

//Import nodeMailer and create a tansporter
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://lms.siasolutions%40gmail.com:lmsisbest@smtp.gmail.com');

// Send an email to parameter email with password parameter password
User.sendPasswordReset = function(email, password, callback){
    var mailOptions = {
        from: '"Learning Made Simple" <lms.siasolutions@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Password Reset', // Subject line
        text: 'text body', // plaintext body
        html: '<p>Your password has been reset! Your new password: ' + password + '</p>' // html body
    };
    // send mail with defined transport object
    if(transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
        return true;
    })){ callback(null, true) };
}

// Exports the object as a whole
module.exports = User;

