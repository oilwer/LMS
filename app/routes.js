 // app/routes.js

// grab the nerd model we just created
var Nerd = require('./models/nerd');
var User = require('./models/user'); 

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

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
        
        // Login function
        app.get('/api/login', function (req,res) {
        
        	// recover parameters
			var username = req.query.username;
			var password = req.query.password;
			
			console.log(username);
			console.log(password);
			
			
			if( (username !== "") && (password !== ""))
			{
			
				if( (username !== null) && (password !== null))
				{
			    
					User.findOne({ 'username': username, 'password': password },  function (err, user) {
					if (err) return handleError(err);
				
					if(!user)
					{
						console.log('Incorrect username or password'); 
						res.json(false);	
					}	
					else
					{
						console.log('Returning data; user name: %s.', user.username); 
						res.json(true);
					}
					});
			
				}
			}

 		});
 		
 		// Profile function
        app.get('/api/profile', function (req,res) {
        
        	// recover parameters
			var username = req.query.username;
			
			console.log(username);
			
			if( (username !== "") && (username !== null))
			{
				
					User.findOne({ 'username': username},  function (err, user) {
					if (err) return handleError(err);
				
					if(!user)
					{
						console.log('Incorrect username'); 
						res.json(false);	
					}	
					else
					{
						console.log('Returning data; user name: %s.', user.username); 
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
		
		// sample api route
        app.get('/api/login', function(req, res) {
            
            res.json("Yolo");
            
        });

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

    };
