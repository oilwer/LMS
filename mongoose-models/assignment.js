module.exports = function(mongoose){

  var sha1 = require('sha1');

    var AssignmentSchema = new mongoose.Schema({ 
    name: String,
    url: String,
    due_date: Date,
    description: String,
    added_on: Date,
    course:  { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    resources: [{
        name: String
    }],
    responsible_teacher:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    teachers:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    is_published: Boolean,
    teacher_instruction_file: String,
    assessment: String,
    obligatory: Boolean
});

  // Return the model
  return mongoose.model("Assignment", AssignmentSchema);
};