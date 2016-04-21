module.exports = function(mongoose) {

  var Slack = require('slack-node');

    return [function (req, res) {

      var User = mongoose.model('User');

    //var myChannelID = "C0RRZEDK4"; //HARD CODED FOR NOW  

    if(req.method == 'DELETE') {
      User.findOne({email: req.query.userIdentifier}, function(err, user) {
          if (err || !user) {
            // we failed to find or run query
            res.json(false);
            return;
          }

          var apiToken = user['slack_token'];
          var slack = new Slack(apiToken);

          if(req.query.action == "leave"){
          
            slack.api('channels.leave', {
                token:apiToken,
                channel:req.query.id, //this is actually the channel id
            }, function(err, response){
              res.json(response);
            });  
          }
      });
    }      

    if(req.method == 'GET') {
      User.findOne({email: req.query.userIdentifier}, function(err, user) {
          if (err || !user) {
            // we failed to find or run query
            res.json(false);
            return;
          }

          var apiToken = user['slack_token'];
          var slack = new Slack(apiToken);

        if(req.query.action == "getHistory"){
          slack.api('channels.history', {
              token:apiToken,
              count:20,
              channel:req.query.id }, function(err, response){
                  res.json(response);
          });          
        }

        if(req.query.action == "getChannels"){
          slack.api('channels.list', {
            token:apiToken,
            exclude_archived:1 }, function(err, response){
              res.json(response);
          });
        }
      });      
    }

    if (req.method == 'POST') {
       User.findOne({email: req.body.userIdentifier}, function(err, user) {
          if (err || !user) {
          // we failed to find or run query
          res.json(false);
          return;
        }
        //got the user

          var apiToken = user['slack_token'];
          var slack = new Slack(apiToken);

          if(req.body.action == "createChannel"){
            //If creating a channel
            slack.api('channels.create', {
              token: apiToken,
              name: req.body.channelName,
            }, function(err, response){
              res.json(response);
            });

          } else if(req.body.action == "joinChannel"){
            slack.api('channels.join', {
              token: apiToken,
              name: req.body.channelName,
            }, function(err, response){
              res.json(response);
            });
            
          } else {
            //User.get();
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
        });
    }
  }];
};
