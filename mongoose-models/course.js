module.exports = function(mongoose){

  
 // Defines the Course Schema (How the DB is structured)
var CourseSchema = new mongoose.Schema({    
    code: String,
    status: Boolean,
    creator: mongoose.Schema.Types.ObjectId,
    //name: String,
    // description: String,
    // start: String,
    // end: String,    
    // url: String,    
    // teacher: String,
    // assignments: [{
    //     assignment_name: String,
    //     assignment_deadline: String
    // }],
    // students: [{
    //     student_name: String
    // }],
    // resources: [{
    //     resource_name: String,
    //     resource_creator: String
    // }],
    // messages: [{
    //     title: String,
    //     content: String,
    //     creator: String,
    //     date: String
    // }]
});

  // Return the model
  return mongoose.model("Course", CourseSchema);
};