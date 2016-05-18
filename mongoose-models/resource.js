module.exports = function(mongoose){

    var ResourceSchema = new mongoose.Schema({
        title: String,
        filename: String,
        categories: String,
        tags: String,
        filetype: String,
        url: String,
        content: String,
        uploaded_on: Date,
        assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
        course:  { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        uploaded_by:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    });

  // Return the model
  return mongoose.model("Resource", ResourceSchema);
};
