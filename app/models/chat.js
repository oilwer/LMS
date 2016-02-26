// app/js/models/user.js

// Constructor
var Chat = function (data) {  
    this.data = data;
}

/*var Slack = require('slack-node');
webhookUri = "https://hooks.slack.com/services/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";
slack = new Slack();
slack.setWebhook(webhookUri);

Chat.send = function (username, text, callback) { 
		slack.webhook({
		  channel: "#webhooksapi",
		  username: username,
		  text: text
		}, function(err, response) {
		  console.log(response);
		});
}

 
Chat.fetch = function (callback) { 
		
}

*/

var Slack = require('slack-node');
apiToken = "xoxp-19435876323-19435876435-23242437972-12e5f18962";
 
slack = new Slack(apiToken);
 
 
 Chat.fetchMsg = function (callback) { 
 	
		 	//list messages
	 	slack.api('mpim.history',{
	 	  channel:'#webhooksapi'
	 	}, function(err, response){
	 	  console.log(response);
	 	});
 }
 
 Chat.send = function (username, text, callback) { 
	 
	 	/*
		 	//list users
	 	slack.api('users.list', {
	 	  token:apiToken
	 	}, function(err, response){
	 	  console.log(response);
	 	});
	 	*/
	 	 
	 	//send message
	 	slack.api('chat.postMessage', {
	 	  text:text,
	 	  as_user:true,
	 	  channel:'#webhooksapi'
	 	}, function(err, response){
	 	  console.log(response);
	 	});

}

// Exports the object as a whole
module.exports = Chat;

