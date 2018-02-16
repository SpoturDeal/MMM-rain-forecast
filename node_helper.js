var NodeHelper = require('node_helper')
var request = require('request')

module.exports = NodeHelper.create({
	// Override start method.
	start: function() {
		console.log("Starting node helper for: " + this.name);
		return;
	},
	// Override socketNotificationReceived method.
	socketNotificationReceived: function(notification, payload) {
		self = this;
		this.url = payload.apiBase+"/" + payload.endpoint + "?lat=" + payload.lat + "&lon="+ payload.lon;
        setInterval(function() {
			self.getData(self)
		}, payload.updateInterval);
		
		this.getData(this);
		return;
	},
	getData: function(self) {
 		request({url: self.url, method: 'GET'}, function(error, response, body) {
			self.processData(error, response, body, self);
		});
		
	},
    processData: function(error, response, body, self) {
       // First handle server side errors
       if (error) {
			self.sendSocketNotification("ERROR", {
				error: "Error ",
			});
			return;
		}
        // Page or url has not been found
		if (response.statusCode != 200) {
			self.sendSocketNotification("ERROR", {
				error: body,
			});
			return;
		}
        // This is test data just to see the graph if there is no rain
        //body="077|10:05\n034|10:10\n101|10:15\n087|10:20\n077|10:25\n000|10:30\n000|10:35\n000|10:40\n077|10:45\n087|10:50\n087|10:55\n077|11:00\n077|11:05\n034|11:10\n017|11:15\n000|11:20\n000|11:25\n000|11:30\n000|11:35\n000|11:40\n000|11:45\n000|11:50\n000|11:55\n000|12:00";
        
        // Make an array with the amount of rain  077|10:05 = rain|time
        var rainDrops = [];
        // Make an array with the times received
		var times = [];
        // Count all rain together
		var expectRain = 0;
        // Make seprate lines
		var lines = body.split('\n');
		for(var i = 0;i < lines.length-1;i++){
			var values = lines[i].split('|');
            // split rain from time
            rainDrops.push(values[0]=="NaN"?0:parseInt(values[0]));
			times.push(values[1]);
			expectRain += parseInt(values[0]);
		}
        // Send all to script
        self.sendSocketNotification('RAIN_DATA', {
            rainDrops:  rainDrops,
            times:      times,
            expectRain: expectRain
        });
  }

})



