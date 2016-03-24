module.exports = function(mongoose){

  // Create a new mongoose schema
  var ItemSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: false}
    // a relation
    // author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  });

  // Return the model
  return mongoose.model("Item", ItemSchema);
};