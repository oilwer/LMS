// app/js/models/user.js

// Constructor
var User = function (data) {  
    this.data = data;
}

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({ 
  //  profilePic: String,
  	email: String,
  	password: String,
  	first_name: String,
    phone_number: String
});

// set up a mongoose model and pass it using User.DB (User is a object w/ db as a property) 
User.db = mongoose.model('User', userSchema);

// Login function. Callback is the variable that returns the value
User.login = function (email, password, callback) {  
   	
   					
			if( (email !== "") && (password !== ""))
			{
			
				if( (email !== null) && (password !== null))
				{
			    
					User.db.findOne({ 'email': email, 'password': password },  function (err, user) {
					if (err) return handleError(err);
				
					if(user)
					{
						console.log(user.first_name + ' logged in.'); 
						callback(null, true);
					}	
					else
					{
						console.log(email + ' tried to log in: Incorrect email or password.'); 
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
    var newUser = new User.db({first_name: user.first_name, email: user.email, phone_number: user.phone_number, password: user.password });

    newUser.save ( function(err, ret){
        if (err) return console.error(err);
        callback(null, ret);
        console.log(ret);
    });
};

//insert new user in db
/*User.test = function () {
    var newUser = new User.db({email: "oliver", password: "password" });

    newUser.save ( function(err, ret){
        if (err) return console.error(err);
        console.log(ret);
    });
};
*/

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
    User.db.findByIdAndUpdate(user._id, {first_name: user.first_name, email: user.email, phone_number: user.phone_number, password: user.password}, {new: true}, function (err, ret){
        console.log(ret);
        callback(null, ret);
    });
};


// Exports the object as a whole
module.exports = User;

