module.exports = function(mongoose) {

   var Slack = require('slack-node');

    return [function (req, res) {
      
    var apiToken = "xoxp-19435876323-19928068646-25845104513-b17be7dd15";
    var myChannelID = "C0RRZEDK4"; //HARD CODED FOR NOW         
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
      if(req.body.channelName != undefined){
        slack.api('channels.create', {
          token: apiToken,
          name: req.body.channelName,
        }, function(err, response){
          res.json(response);
        });
        console.log("We are creating a channel");

      } else {
        console.log("we are posting a message");
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