module.exports = function(mongoose){

  var sha1 = require('sha1');

  var UserSchema = new mongoose.Schema({
    profile_pic: String,
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
    courses_pinned: [{
        course: String,
        pinned: Boolean
    }],
    notifications: [{
      url: String,
      is_viewed: Boolean,
      created_on: {type: Date, default: Date.now},
      title: String,
      text: String

    }],
    assignments: [{
      assignment: {type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
      grade: Number,
      comment: String,
      submissionDate: Date,
      answer_file: String,
      answerDate: { type: Date, default:Date.now },
      answeredBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      answerComment: String, //feedback from teacher
      status: String // New|Wating|Resubmit|Done
      //{ New (when created) | Waiting (when submitted/resubmitted) | Resubmit (answered by teacher) | Done (answered by teacher)}
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
   slack_token: String, //holds slack token
   skills: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Tags'
    }]
});

  UserSchema.pre('save', function(next){
    if (!this.password) { return; }
    this.password = sha1(this.password);
    next();
  });

  UserSchema.pre('update', function(next){

    if (this._update.$set != null){
    //console.log("Set undefined");

      if (!this._update.$set.password) {
        //console.log ("Not hashing ", this._update.$set.password);
      }
      else {
        this._update.$set.password = sha1(this._update.$set.password);
      }    }

    next();
  });


  // Return the model
  return mongoose.model("User", UserSchema);
};
