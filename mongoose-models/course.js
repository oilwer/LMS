module.exports = function(mongoose){

  
 // Defines the Course Schema (How the DB is structured)
var CourseSchema = new mongoose.Schema({
    name: String,
    description: String,
    start: String,
    end: String,
    status: Boolean,
    url: String,
    teacher: String,
    assignments: [{
        assignment_name: String,
        assignment_deadline: String
    }],
    students: [{
        student_name: String
    }],
    resources: [{
        resource_name: String,
        resource_creator: String
    }],
    messages: [{
        title: String,
        content: String,
        creator: String,
        date: String
    }]
});

  // Return the model
  return mongoose.model("Course", CourseSchema);
};