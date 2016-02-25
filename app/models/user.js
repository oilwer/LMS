// app/js/models/user.js

// Constructor
var User = function (data) {  
    this.data = data;
}

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({ 
    profilePic: String,
    username: String,
    name: String,
    email: String,
    number: String,
    password: String
});

// set up a mongoose model and pass it using User.DB (User is a object w/ db as a property) 
User.db = mongoose.model('User', userSchema);

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

//returns all users
User.getAllUsers = function (callback){

    User.db.find({}, function(err, users){
        if (err) return console.error(err);
        callback(null, users);
     //   console.log(users);
        //console.log(docs);

    });
};

//update selected users data
User.getById = function(id, callback){
    User.db.findOne ( {_id: id}, function(err, ret){
        if (err) return console.error(err);
        //console.log(ret);
        //send res back to controller
        callback(null, ret);
    });
};

//insert new user in db
User.register = function (user, callback) {
    var newUser = new User.db({name: user.name, email: user.email, number: user.number });

    newUser.save ( function(err, ret){
        if (err) return console.error(err);
        callback(null, ret);
        console.log(ret);
    });
};

//insert new user in db
User.test = function () {
    var newUser = new User.db({username: "oliver", password: "password" });

    newUser.save ( function(err, ret){
        if (err) return console.error(err);
        console.log(ret);
    });
};

//delete user in db
User.remove = function(id, callback){
    //send res back to controller
    User.db.remove ( {_id : id}, function(err, ret){
        if (err) return console.error(err);
        console.log(ret);
        callback(null, ret);
    });
};

//modify selected user
User.modify = function(user, callback){
    User.db.findByIdAndUpdate(user._id, {name: user.name, email: user.email, number: user.number}, {new: true}, function (err, ret){
        console.log(ret);
        callback(null, ret);
    });
};


// Exports the object as a whole
module.exports = User;

