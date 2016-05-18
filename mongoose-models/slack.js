module.exports = function(mongoose){

  // Defines the slack Schema (How the DB is structured)
  var SlackSchema = new mongoose.Schema({
    client_id: String,
    secret: String,
    team_id: String,
      channels:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'Channel'
      }],
  });

  // Return the model
  return mongoose.model("Slack", SlackSchema);
};
