module.exports = function(mongoose) {
	
	//Import nodeMailer and create a tansporter
	var nodemailer = require('nodemailer');
	var sha1 = require('sha1');
	var transporter = nodemailer.createTransport('smtps://lms.siasolutions%40gmail.com:lmsisbest@smtp.gmail.com');
		
  return [function (req, res) {
    var User = mongoose.model('User');
    
    //Create random 8 character string
	var randomPassword = function(max, min){
	   var newPass = "";
	   for (var i = 0; i < 4; i++) {
	       var num = Math.floor(Math.random()*(max-min+1)+min);
	       var letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
	       newPass += num.toString();
	       newPass += letter;
	   };
	   return newPass;
	}
	
	//send mail with pasword
    var sendPasswordReset = function (email, newPass)
    {
	    console.log("email", email);
	     var mailOptions = {
	       from: '"Learning Made Simple" <lms.siasolutions@gmail.com>', // sender address
	       to: email, // list of receivers
	       subject: 'Password Reset', // Subject line
	       text: 'text body', // plaintext body
	       html: '<p>Your password has been reset! Your new password: ' + newPass + '</p>' // html body
	   	};
	   
	   // send mail with defined transport object
	   if(transporter.sendMail(mailOptions, function(error, info){
	       if(error){
	           return console.log(error);
	       }
	       console.log('Message sent: ' + info.response);
	       res.json("updated");
	   }));  
    }
    
    if (req.method == 'GET') {
	    console.log("welcome");
	    res.json("welcome");
	    }

    
    // update user password
    if (req.method == 'PUT') {
	    console.log("updating password");
      var newPass = randomPassword(1, 9);
     var passCrypt = sha1(newPass);
	  User.findOneAndUpdate( { "email" : req.body.email }, {
           password: passCrypt
           },{new: true}, function (err, response){ 
       if (err) return console.error(err);
       	  
       	  console.log(req.body.email);
       	  
       sendPasswordReset(req.body.email, newPass);
    });
    }
    
    

  }];
};