module.exports = function(mongoose){

  // Defines the slack Schema (How the DB is structured)
  var TagSchema = new mongoose.Schema({
    tag: String
  });

  // Return the model
  return mongoose.model("Tag", TagSchema);
};
