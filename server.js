// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose	   = require('mongoose');
var User 		   = require('./app/models/user'); // get our mongoose model
var session = require('express-session');


// configuration ===========================================

// Use the session middleware
app.use(session({ secret: 'b1k3z 4r3333 450m3', cookie: { maxAge: 180000 }}))

    
// Test functions
var testdbfunc = function()
{
	// Create Schema
	var kittySchema = mongoose.Schema({
    	name: String
	});

	// "Speak" functionallity?
	// NOTE: methods must be added to the schema before compiling it with mongoose.model()
	kittySchema.methods.speak = function () {
	  var greeting = this.name
	    ? "Meow name is " + this.name
	    : "I don't have a name";
	  console.log(greeting);
	}
	
	// Compile Schema into a Model
	var Kitten = mongoose.model('Kitten', kittySchema);
	
	// Add entry "Cat name Silence"
	var silence = new Kitten({ name: 'Silence' });
	console.log(silence.name); // 'Silence'
	
	// Add entry "Cat name Fluffy"
	var fluffy = new Kitten({ name: 'fluffy' });
	// Runs fluffys method "Speak"
	fluffy.speak(); // "Meow name is fluffy"
	
	process.stdout.write("Lets find all the Kittens");
	
	// Save test user
	/*
		  var testUser = new User({ 
		    username: 'oliver', 
		    password: 'password'
		  });
		
		  // save the sample user
		  testUser.db.save(function(err) {
		    if (err) throw err;
		
		    console.log('Test user saved successfully');
		  });

		  */
	
	/* 
		var myCursor = Kitten.find(
	{name: "Silence"}
	);

	 console.log(myCursor);
	 */

	// find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
	
	/*
	Kitten.findOne({ 'name': 'fluffy' }, 'name', function (err, kitten) {
	if (err) return handleError(err);
	console.log('Returning data; Cat name: %s.', kitten.name); // Space Ghost is a talk show host.
	});
	*/

	
	/* Save this stuff to DB
	fluffy.save(function (err, fluffy) {
	  if (err) return console.error(err);
	  
	  process.stdout.write("Document saved to DB");
	  
	*/ 	
	// Find everything on kittens
	 Kitten.find(function (err, kittens) {
	  if (err) return console.error(err);
	  console.log(kittens);
	});
	
	/*
	 User.schemas.find(function (err, users) {
	  if (err) return console.error(err);
	  console.log(users);
	});
	*/
	  
	  /*var callback;
	  
	  console.log("Find ^Fluff");
	
	  // Perform query
	  Kitten.find({ name: /^fluff/ }, callback);
	  console.log(callback);
	  */
	  
	// });
	
	
	
}
    
// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080; 

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(db.url); 

// Check if the DB connection is OK
var dbconn = mongoose.connection;
dbconn.on('error', console.error.bind(console, 'connection error:'));
dbconn.once('open', function() {
  // we're connected!
  	process.stdout.write("Connected to DB");
  	testdbfunc();
});



// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// routes ==================================================
require('./app/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;                         
