module.exports = function(mongoose){

  var sha1 = require('sha1');

  var UserSchema = new mongoose.Schema({
    profilePic: String,
    email: String,
    first_name: String,
    last_name: String,
    description: String,
    personality: String,
    phone_number: String,
    password: String,
    public_url: String,
    homepage: String,
    facebook: String,
    linkedin: String,
    github: String,
    twitter: String,
    courses: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Course'
    }],
    assignments: [{
      assignment: {type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
      grade: Number,
      comment: String,
      is_answerd: Boolean,
      answer_file: String
    }],
    plugs:[{
            id: String,
            name: String,
            path: String,
            isActive: Boolean,
            x: Number,
            y: Number
   }],
   role: String, //student/admin/teacher
   slack_token: String //holds slack token
});

  UserSchema.pre('save', function(next){
    if (!this.password) { return; }
    this.password = sha1(this.password);
    next();
  });

  UserSchema.pre('update', function(next){

    if (this._update.$set != null){
    console.log("Set undefined");

      if (!this._update.$set.password) {
        console.log ("Not hashing ", this._update.$set.password);
      }
      else {
        this._update.$set.password = sha1(this._update.$set.password);
      }    }

    next();
  });


  // Return the model
  return mongoose.model("User", UserSchema);
};
