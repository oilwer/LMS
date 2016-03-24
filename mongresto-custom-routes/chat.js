module.exports = function(mongoose) {

   var Slack = require('slack-node');

    return [function (req, res) {

         
    var apiToken = "xoxp-19435876323-19928068646-25845104513-b17be7dd15";
    var myChannelID = "C0RRZEDK4"; //HARD CODED FOR NOW         
   var slack = new Slack(apiToken);


    if (req.method == 'GET') {

        console.log(req);

 

        console.log("bruuug");
       // res.json("?????");
        slack.api('channels.history', {
            token:apiToken,
            channel:myChannelID }, function(err, response){
                res.json(response);
        });
        
    }

    if (req.method == 'POST') {
         slack.api('chat.postMessage', {
                  text: req.body.text,
                  as_user:true,
                  channel:'#testchat'
              }, function(err, response){
                   res.json(response);   
              });        
    }
  }];
};