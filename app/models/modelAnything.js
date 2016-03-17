// app/js/models/ModelAnything.js

// Constructor
var ModelAnything = function (data) {  
    this.data = data;
}

// Defines the array that will contain the config
var tempConfigArray = [];

var configArray = [];

// Read config
ModelAnything.readConfig = function (callback){
	var filename = "././public/plugs/config.txt"
	
	// Read the file and print its contents.
	var fs = require('fs');
	fs.readFile(filename, 'utf8', function(err, data) {
		if (err) throw err;
		console.log('OK: ' + filename);
		console.log(data);
		
		tempConfigArray = data.split(",");
		
		
		for(var i=0;i<tempConfigArray.length;i+=4) {
			var obj = {
				name:tempConfigArray[i], 
				path:tempConfigArray[i+1], 
				guiPos:tempConfigArray[i+2], 
				isActive:tempConfigArray[i+3]
			}
			configArray.push(obj); 
			console.log(obj);
		}
		
		callback(null, JSON.stringify(configArray));
	});
};

ModelAnything.initPlugs = function (sess, callback){
	


	
	 var fetch = "";
	
	
	for (var i = 0; i < sess.length; i++){
		console.log("SESS i:");
		console.log(sess[i].plug.isActive);
		
		if(sess[i].plug.isActive == true){
			var plug = require(sess[i].plug.path);
			
			fetch += plug.fetch();
		
			
			
		}
		
	}
	
	
	 callback(null, fetch);

	
};



// Exports the object as a whole
module.exports = ModelAnything;

