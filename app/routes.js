 // app/routes.js

var User = require('./models/user'); 
var Chat = require('./models/chat'); 
var session = require('express-session');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        
        // Test session
        app.get('/awesometestsession', function(req, res) {
			var sess = req.session;
			
				if(sess.isLoggedIn) console.log("You are logged in");
			
  				if (sess.views) {
  					sess.views++
  				  	res.setHeader('Content-Type', 'text/html')
	  				res.write('<p>views: ' + sess.views + '</p>')
	  				res.write('<p>Logged in : ' + sess.isLoggedIn + '</p>')
	  				res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
	  				res.end()
  				} else{
  				  	sess.views = 1
  				  	res.end('welcome to the session demo. refresh!')
  				}
		});
		
		//Get all users
		app.get('/api/userlist', function(req, res){
			
			//Get the user list from the database
			User.getAllUsers(function(err, callback){
				res.json(callback);
			});
		});

		//Get user by id
		app.get('/api/user/', function(req, res){
			// Fetches User by ID
			User.getById(req.query.id, function(err, callback){
				res.json(callback);
			});
		});

		//Get user by public url
		app.get('/api/public/user', function(req, res){

            console.log("Routes: "+req.query.url);
			// Fetches User by public url
			User.getByPublicURL(req.query.url, function(err, callback){
				res.json(callback);
			});
		});

		//Register new user
		app.post('/api/user', function(req, res){
			
			// Checks for empty fields
			if(req.body.role !== undefined && req.body.first_name !== undefined
                && req.body.email !== undefined && req.body.phone_number !== undefined) {
	
				// Adds the new user to DB
				User.register(req.body, function (err, callback) {
					res.json(callback);
				});
			}
		});

		// Delete selected user by id
		app.delete('/api/user', function(req, res){

			//remove from database
			User.remove(req.query.id, function(err, callback){
				res.json(callback);
			});
		});

		//update selected users data
		app.put('/api/user', function(req, res){
		
			// Updates user
			User.modify(req.body, function(err, callback){
				res.json(callback);
			});
		});

	
        // Logout function
        app.get('/api/logout', function (req,res) {
	        
	        // Fetches current sessions
	        var sess = req.session;
	        
	        // Destroys the session
	        req.session.destroy(function(err) {
				res.json("Logged out.");
			})
	        
	    });    
        
        // Login function
        app.get('/api/login', function (req,res) {
	        	
            // Fetches session variable
            var sess = req.session;

            // If already logged in - return true (No need to DB query's)
            if(sess.isLoggedIn == true) {
                res.json(true);
            }

            // Not logged in
            else {
                // Triggers login function in the User model
                User.login(req.query.email, req.query.password, function(err, callback){

                    // If user gets logged in -> Set session isLoggedIn to true.
                    if(callback){
                        sess.isLoggedIn = true;
                        sess.email = req.query.email;
                    }

                    // Returns the login value (bool) to LoginCtrl
                    res.json(callback);
                });
            }
 		});
 		
 		// Function that gets the logged in user's profile 
        app.get('/api/profile', function (req,res) {
	        
	        // Fetches session variable
	        var sess = req.session;
        
        	// recover parameters
			var email = sess.email; //TODO: use id instead of email
			
			//console.log(sess);
			
			if( (email !== "") && (email !== null))	{ 
				
				//looks for one user in db with email from session
				User.db.findOne({ 'email': email},  function (err, user) {
					if (err) return handleError(err);
			
					//if a user was not found in db
					if(!user) {
						console.log('User does not exist'); 
						res.json(false);	
					}
					//if a user was found 	
					else {
						console.log('Profile fetched; email: %s', user.email); 
						res.json(user);
					}
				});
			}

 		});
 	       
		
		// Api start, TODO: documentation
        app.get('/api', function(req, res) {
            
            res.json("Welcome to our api! /login & /profile works");
        });
		
		
		// chat api route
        app.post('/api/chat', function(req, res) {

			// Asks chat service to send message 
			Chat.send(req.query.username, req.query.text, function(err, callback){
		
				//TODO: Do something, user feedback on sending message
				if(callback) {
					console.log(callback);
				}
			});           
        });
        
        
        //WIP
        app.get('/api/getchatmsg', function(req, res) {
            
            console.log("??");
			// Triggers login function in the User model
			Chat.fetchMsg(function(err, callback){
		
				// If user gets logged in -> Set session isLoggedIn to true. 
				if(callback){
					 res.json(callback);
					console.log(callback);
				}
				
			});                  
        });
		

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

    };
