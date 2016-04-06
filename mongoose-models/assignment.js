module.exports = function(mongoose){

  var sha1 = require('sha1');

  // Defines the user Schema (How the DB is structured)
  var AssignmentSchema = new mongoose.Schema({ 
    name: String,
    due_date: Date,
    description: String,
    added_on: Date,
    course:  { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    participants:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    responsible_teacher:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    teachers:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	grade: Number,
	comment: String,
	is_published: Boolean,
	is_answerd: Boolean,
	file: String,
	answer: String,
	answer_date: Date
});

  // Return the model
  return mongoose.model("Assignment", AssignmentSchema);
};