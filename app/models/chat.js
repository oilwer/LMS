// app/js/models/chat.js

// Constructor
var Chat = function (data) {  
    this.data = data;
}

var Slack = require('slack-node');
var apiToken = "xoxp-19435876323-19928068646-25845104513-b17be7dd15";

//for test purposes
var myChannelCode = "C0RRZEDK4";
 
slack = new Slack(apiToken);
 
Chat.send = function (username, text, callback) {

    //send message
    slack.api('chat.postMessage', {
          text:text,
          as_user:true,
          channel:'#testchat'
        }, function(err, response){
          callback(null,response);
        });
}

//TODO: getMessages
Chat.getMessage = function (channelID, callback){


var time = Date.now();
    slack.api('channels.history', {
        token:apiToken,
        channel:channelID
        }, function(err, response){
            callback(null, response);
        });
}

//Returns all channels associated with api token
Chat.getChannelList = function (callback){

    slack.api('channels.list', {
        token:apiToken
        }, function(err, response){
            callback(null, response);
        });
}

// Exports the object as a whole
module.exports = Chat;

