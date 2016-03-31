module.exports = function(mongoose){

  
 // Defines the Course Schema (How the DB is structured)
var CourseSchema = new mongoose.Schema({    
    code: String,
    status: Boolean,
    url: String,
    teacher: String,
    assignments: [{
        assignment_name: String,
        assignment_deadline: String
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
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
    creator : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

  // Return the model
  return mongoose.model("Course", CourseSchema);
};