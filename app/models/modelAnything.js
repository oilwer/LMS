// app/js/models/ModelAnything.js

// Constructor
var ModelAnything = function (data) {  
    this.data = data;
}

// Function that initializes all the plug's dependeing on the config session
ModelAnything.initPlugs = function (plugConfig, callback){
	
	
	// Container for all the plug's html
	var html = "";
	
	// For each plug - fetch() the plug's html.
	for (var i = 0; i < plugConfig.length; i++){
		
		// If the plug is activated
		if(plugConfig[i].isActive == true){
			
			// Init plug
			var plug = require(plugConfig[i].path);
			
			// Adds html to all plugins
			html += '<div id="plugin{{$id}}" class="plugin testplug jumbotron">';
			
			// Run fetch method from plug
			html += plug.fetch();
			
			// And close the plugin div
			html += '</div>';
		}	
	}	
	
	callback(null, html);
};

// Exports the object as a whole
module.exports = ModelAnything;