// app/js/models/course.js

// Constructor
var Course = function (data) {
    this.data = data;
};

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Defines the Course Schema (How the DB is structured)
var courseSchema = new Schema({
    name: String,
    description: String,
    start: String,
    end: String,
    status: Boolean,
    url: String,
    teacher: String,
    assignments: {
        assignment_name: String,
        assignment_deadline: String
    },
    students: {
        student_name: String
    },
    resources: {
        resource_name: String,
        resource_creator: String
    },
    messages: {
        title: String,
        content: String,
        creator: String,
        date: String
    }
});

// set up a mongoose model and pass it using Course.DB (Course is a object w/ db as a property)
Course.db = mongoose.model('Course', courseSchema);




// Function that returns all courses
Course.getAllCourses = function (callback){

    Course.db.find({}, function(err, courses){
        if (err) return console.error(err);

        //TODO: courses is always true, check if elements exist in array instead
        // If the result exists (Courses found)
        if(courses) {
            callback(null, courses);
        }

        // No results found
        else {
            callback(null, false);
        }
    });
};

// Function that returns a course by ID
Course.getById = function(id, callback){
    Course.db.findOne ( {_id: id}, function(err, course){
        if (err) return console.error(err);

        // If the result exists (Course found)
        if(course) {
            callback(null, course);
        }

        // No results found
        else {
            console.log('Course does not exist');
            callback(null, false);
        }
    });
};
//
//// Function that returns a course by public URL
//Course.getByPublicURL = function(public_url, callback){
//    Course.db.findOne ( {public_url: public_url}, function(err, course){
//        if (err) return console.error(err);
//
//        // If the result exists (Course found)
//        if(course) {
//            callback(null, course);
//            console.log('Profile fetched; email: %s', course.id);
//        }
//
//        // No results found
//        else {
//            callback(null, false);
//        }
//    });
//};

//Function that inserts a new course in db
Course.register = function (course, callback) {

    // Inits course.db object
    var newCourse = new Course.db({
        name: course.name,
        description: course.description,
        start: course.start,
        end: course.end,
        status: course.status,
        url: course.url,
        teacher: course.teacher,
        assignments: course.assignments,
        students: course.students,
        //ALL THIS REQUIRED ?
        resources: course.resources,
        messages: course.messages
    });
    // Save to the mongo DB
    newCourse.save ( function(err, response){

        if (err) return console.error(err);
        callback(null, response);
        console.log(response);
    });
};


// Function that removes a course in db by ID
Course.remove = function(id, callback){

    //send response back to controller
    Course.db.remove ( {_id : id}, function(err, response){
        if (err) return console.error(err);
        console.log(response);
        callback(null, response);
    });
};

//Function that modifies selected course
Course.modify = function(course, callback){


    // Find by id and update course
    Course.db.findByIdAndUpdate(course._id, {
        name : course.name,
        description: course.description,
        start: course.start,
        end: course.end,
        status: course.status,
        url: course.url,
        teacher: course.teacher,
        assignments: course.assignments,
        students: course.students,
        //ALL THIS REQUIRED ?
        resources: course.resources,
        messages: course.messages
    },{new: true}, function (err, response){ // TODO: What is new: true?
        if (err) return console.error(err);
        console.log(response);
        callback(null, response);
    });
};


// Exports the object as a whole
module.exports = Course;

