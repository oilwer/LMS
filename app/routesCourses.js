// app/routesCourses.js

//var User = require('./models/user');
//var Chat = require('./models/chat');
//var ModelAnything = require('./models/modelAnything');
var session = require('express-session');
var Course = require('./models/course');

module.exports = function(app) {

    // server routes for Courses ===========================================================
    // handle api calls






//hej
    //Get all courses
    app.get('/api/courselist', function(req, res){
        //Get the course list from the database
        Course.getAllCourses(function(err, callback){
            res.json(callback);
        });
    });

    //Get course by id
    app.get('/api/course/', function(req, res){
        // Fetches Course by ID
        Course.getById(req.query.id, function(err, callback){
            res.json(callback);
        });
    });

    //Get course by public url
    app.get('/api/public/course', function(req, res){

        console.log("Routes: "+req.query.url);
        // Fetches Course by public url
        Course.getByPublicURL(req.query.url, function(err, callback){
            res.json(callback);
        });
    });

    //Register new course
    app.post('/api/course', function(req, res){

        // Checks for empty fields
        if(req.body.role !== undefined && req.body.first_name !== undefined
            && req.body.email !== undefined && req.body.phone_number !== undefined) {

            // Adds the new course to DB
            Course.register(req.body, function (err, callback) {
                res.json(callback);
            });
        }
    });

    // Delete selected course by id
    app.delete('/api/course', function(req, res){

        //remove from database
        Course.remove(req.query.id, function(err, callback){
            res.json(callback);
        });
    });

    //update selected courses data
    app.put('/api/course', function(req, res){
        console.log("Workss");
        // Updates course
        Course.modify(req.body, function(err, callback){
            res.json(callback);
        });
    });












    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });
};

