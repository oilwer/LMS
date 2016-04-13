module.exports = function(mongoose) {

   var Slack = require('slack-node');

    return [function (req, res) {

      var User = mongoose.model('User');

      var getUserToken = function(userIdentifier){
        var token;
        
        User.findOne({email: userIdentifier}, function(err, user) {
          if (err || !user) {
          // we failed to find or run query
          res.json(false);
          return;
        }
        //got the user
        console.log(user['slack_token']);
        token = user['slack_token'];
        });
        return token;
      }
      
    //var apiToken = "xoxp-19435876323-19928068646-25845104513-b17be7dd15";
    //var myChannelID = "C0RRZEDK4"; //HARD CODED FOR NOW         
    var slack = new Slack(apiToken);


    if (req.method == 'GET') {

        console.log(req.query.id);
        console.log("bruuug");
       // res.json("?????");
        slack.api('channels.history', {
            token:apiToken,
            count:20,
            channel:req.query.id }, function(err, response){
                res.json(response);
        });        
    }

    if (req.method == 'POST') {
      var apiToken = getUserToken(req.body.userIdentifier);
      console.log(apiToken + " the token");
      if(req.body.action == "createChannel"){
        //If creating a channel
        slack.api('channels.create', {
          token: apiToken,
          name: req.body.channelName,
        }, function(err, response){
          res.json(response);
        });
      } else if(req.body.action == "joinChannel"){
        lack.api('channels.join', {
          token: apiToken,
          name: req.body.channelName,
        }, function(err, response){
          res.json(response);
        });
      } else {
        User.get();
        //If posting a message
        slack.api('chat.postMessage', {
                  token: apiToken,
                  text: req.body.text,
                  as_user:true,
                  channel:req.body.channel,
              }, function(err, response){
                   res.json(response);   
              });        
      }  
    }
  }];
};