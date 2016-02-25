// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using User.DB (User is a object w/ db as a property) 
var userSchema = mongoose.model('User', new Schema({ 
    username: String, 
    password: String
}));

// Exports the object as a whole
module.exports = userSchema;