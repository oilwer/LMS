module.exports = function(mongoose){

  // Defines the slack Schema (How the DB is structured)
  var SlackSchema = new mongoose.Schema({ 
     name: String,
     channel_id: String,
     connected_course_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
  });

  // Return the model
  return mongoose.model("Channel", SlackSchema);
};

