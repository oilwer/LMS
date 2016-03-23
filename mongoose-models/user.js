module.exports = function(mongoose){

  var sha1 = require('sha1');

  // Defines the user Schema (How the DB is structured)
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
   courses: [{
        course_name: String
    }],
   plugs:[{
       id: String,
       name: String,
       path: String,
       isActive: Boolean,
       x: Number,
       y: Number
   }],
   role: String //student/admin/teacher
});

  UserSchema.pre('save', function(next){
    if (!this.password) { return; }
    this.password = sha1(this.password);
    next();
  });

  // Return the model
  return mongoose.model("User", UserSchema);
};