module.exports = function(mongoose){

  
 // Defines the Course Schema (How the DB is structured)
var CourseSchema = new mongoose.Schema({    
    code: String,
    status: Boolean,
    creator : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    // name: String,
    // description: String,
    // start: String,
    // end: String,    
    // url: String,  
    // teachers: [{
    //   type: mongoose.Schema.Types.ObjectId, ref: 'User'
    // }],
    // students: [{
    //   type: mongoose.Schema.Types.ObjectId, ref: 'User'
    // }],  
    // assignments: [{
    //     assignment_id:  mongoose.Schema.Types.ObjectId,
    //     assignment_deadline: String
    // }], 
    // resources: [{
    //     resource_id:  mongoose.Schema.Types.ObjectId,
    //     resource_creator:  mongoose.Schema.Types.ObjectId
    // }],
    // messages: [{
    //     title: String,
    //     content: String,
    //     creator:  mongoose.Schema.Types.ObjectId,
    //     date: String
    // }]
});

  // Return the model
  return mongoose.model("Course", CourseSchema);
};