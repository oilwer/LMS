 // app/routes.js

// grab the nerd model we just created
var Nerd = require('./models/nerd');
var User = require('./models/user'); 
var session = require('express-session');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes
        
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
  				} else {
  				  sess.views = 1
  				  res.end('welcome to the session demo. refresh!')
  				}
		});
		
		//Get all users
		app.get('/api/userlist', function(req, res){
			console.log("I got the GET req! Pink FLuff");
			//get the whole list from the database
			User.getAllUsers(function(err, callback){
				res.json(callback);
			});

		});

		//get by id
		app.get('/api/user', function(req, res){
			var id = req.query.id;
			//console.log("TEST!!!"+id);
			User.getById(id, function(err, callback){
				res.json(callback);
			});
		});

		//Register new user
		app.post('/api/userlist', function(req, res){
			console.log("object: "+req.body);
			if(req.body.name !== undefined && req.body.email !== undefined && req.body.number !== undefined) {
				User.register(req.body, function (err, callback) {
					res.json(callback);
				});
			}
		});

		//delete selected user by id
		app.delete('/api/userlist', function(req, res){
			var id = req.query.id;
			console.log("Id to delete: "+id);
			//remove from database
			User.remove(id, function(err, callback){
				res.json(callback);
			});
		});

		//update selected users data
		app.put('/api/userlist', function(req, res){
			console.log(req.body);
			User.modify(req.body, function(err, callback){
				res.json(callback);
			});
		});

		

        // sample api route
        app.get('/api/nerds', function(req, res) {
            // use mongoose to get all nerds in the database
            Nerd.find(function(err, nerds) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(nerds); // return all nerds in JSON format
            });
        });
        
        // Logout function
        app.get('/api/logout', function (req,res) {
	        
	        // Session variable
	        var sess = req.session;
	        
	        // Destroy the session
	        req.session.destroy(function(err) {
				res.json("Logged out.");
			})
	        
	    });    
        
        // Login function
        app.get('/api/login', function (req,res) {
	        	
	        	// Session variable
	        	var sess = req.session;
	        	
	        	// If already logged in - return true (No need to DB query's)
	        	if(sess.isLoggedIn == true) 
	        	{
		        	res.json(true)
		        }
		        
		        // Not logged in
	        	else
	        	{
					// Triggers login function in the User model
					User.login(req.query.username, req.query.password, function(err, callback){
				
						// If user gets logged in -> Set session isLoggedIn to true. 
						if(callback){
							sess.isLoggedIn = true;
							sess.username = req.query.username;
						}
						
						// Returns the login value (bool) to LoginCtrl
						res.json(callback);
					});
			
				}


 		});
 		
 		// Profile function
        app.get('/api/profile', function (req,res) {
	        
	        // Session variable
	        var sess = req.session;
        
        	// recover parameters
			var username = sess.username;
			
			
			if( (username !== "") && (username !== null))
			{
				
					User.db.findOne({ 'username': username},  function (err, user) {
					if (err) return handleError(err);
				
					if(!user)
					{
						console.log('Incorrect username'); 
						res.json(false);	
					}	
					else
					{
						console.log('Profile fetched; user name: %s.', user.username); 
						res.json(user.username);
					}
					});
			
			}

 		});
 	       
       /*
        app.get('/registeruser', function(req, res) {
		  // create a sample user
		  var nick = new User({ 
		    name: 'Nick Cerminara', 
		    password: 'password',
		    admin: true 
		  });
		
		  // save the sample user
		  nick.save(function(err) {
		    if (err) throw err;
		
		    console.log('User saved successfully');
		    res.json({ success: true });
		  });
		});
		*/
		
		// sample api route
        app.get('/api', function(req, res) {
            
            res.json("Welcome to our api! /login & /profile works");
            
        });
		

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

    };
