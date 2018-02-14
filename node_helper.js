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
        // options = {url: self.url,, method: 'GET'}
 		request({url: self.url, method: 'GET'}, function(error, response, body) {
			self.processData(error, response, body, self);
		});
		
	},
    processData: function(error, response, body, self) {
       if (error) {
			self.sendSocketNotification("ERROR", {
				error: "Error ",
			});
			return;
		}
		if (response.statusCode != 200) {
			self.sendSocketNotification("ERROR", {
				error: body,
			});
			return;
		}
        var rainDrops = [];
		var times = [];
		var expectRain = 0;
        //console.log(body);
		var lines = body.split('\n');
		for(var i = 0;i < lines.length-1;i++){
			var values = lines[i].split('|');
			
            rainDrops.push(values[0]=="NaN"?0:parseInt(values[0]));
			times.push(values[1]);
			expectRain += parseInt(values[0]);
		}
        self.sendSocketNotification('RAIN_DATA', {
            rainDrops:  rainDrops,
            times:      times,
            expectRain: expectRain
        });
  }

})



