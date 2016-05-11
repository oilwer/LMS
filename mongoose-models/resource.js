module.exports = function(mongoose){

    var ResourceSchema = new mongoose.Schema({
    title: String,
    filename: String,
    url: String,
    content: String,
    uploaded_on: Date,
    course:  { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    uploaded_by:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

  // Return the model
  return mongoose.model("Resource", ResourceSchema);
};
