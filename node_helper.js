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
		var self = this;
 		this.url = payload.apiBase+"/" + payload.endpoint + "?lat=" + payload.lat + "&lon=" + payload.lon;
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
		// Test data
        //body = '{"color":"#5A9BD3","lat":52.09,"lon":5.12,"borders":[{"title":"licht","lower":0,"upper":40},{"title":"matig","lower":40,"upper":70},{"title":"zwaar","lower":70,"upper":100}],"timeOffset":2.0,"radius":1,"forecasts":[{"datetime":"2019-05-09T09:50:00","utcdatetime":"2019-05-09T07:50:00","precipitation":1.0,"precipation":0.2,"original":20,"value":0},{"datetime":"2019-05-09T09:55:00","utcdatetime":"2019-05-09T07:55:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T10:00:00","utcdatetime":"2019-05-09T08:00:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T10:05:00","utcdatetime":"2019-05-09T08:05:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T10:10:00","utcdatetime":"2019-05-09T08:10:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T10:15:00","utcdatetime":"2019-05-09T08:15:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T10:20:00","utcdatetime":"2019-05-09T08:20:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T10:25:00","utcdatetime":"2019-05-09T08:25:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T10:30:00","utcdatetime":"2019-05-09T08:30:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T10:35:00","utcdatetime":"2019-05-09T08:35:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T10:40:00","utcdatetime":"2019-05-09T08:40:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T10:45:00","utcdatetime":"2019-05-09T08:45:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T10:50:00","utcdatetime":"2019-05-09T08:50:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T10:55:00","utcdatetime":"2019-05-09T08:55:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T11:00:00","utcdatetime":"2019-05-09T09:00:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T11:05:00","utcdatetime":"2019-05-09T09:05:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T11:10:00","utcdatetime":"2019-05-09T09:10:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T11:15:00","utcdatetime":"2019-05-09T09:15:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T11:20:00","utcdatetime":"2019-05-09T09:20:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T11:25:00","utcdatetime":"2019-05-09T09:25:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T11:30:00","utcdatetime":"2019-05-09T09:30:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T11:35:00","utcdatetime":"2019-05-09T09:35:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T11:40:00","utcdatetime":"2019-05-09T09:40:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T11:45:00","utcdatetime":"2019-05-09T09:45:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T11:50:00","utcdatetime":"2019-05-09T09:50:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T11:55:00","utcdatetime":"2019-05-09T09:55:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T12:00:00","utcdatetime":"2019-05-09T10:00:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T12:05:00","utcdatetime":"2019-05-09T10:05:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T12:10:00","utcdatetime":"2019-05-09T10:10:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T12:15:00","utcdatetime":"2019-05-09T10:15:00","precipitation":0.0,"precipation":0.0,"original":0,"value":0},{"datetime":"2019-05-09T12:20:00","utcdatetime":"2019-05-09T10:20:00","precipitation":0.2,"precipation":1.0,"original":20,"value":0}],"emptytext":"Geen neerslag verwacht","createdUtc":"2019-05-09T07:45:19.1334476Z","lastRefreshUtc":"2019-05-09T07:37:07","elapsedMs":0}';

        // Make an array with the amount of rain  077|10:05 = rain|time
        var rainDrops = [];
        // Make an array with the times received
        var times = [];
        // Count all rain together
        var expectRain = 0;
        data = JSON.parse(body);
        forecast = data.forecasts;
        for (raindata in forecast) {
            if (forecast.hasOwnProperty(raindata)) {
                var rain = forecast[raindata].original;
                var time = forecast[raindata].datetime.substring(11, 16);
                expectRain += parseInt(rain);
                rainDrops.push(rain);
                times.push(time);
            }
        }
        // Send all to script
        self.sendSocketNotification('RAIN_DATA', {
            rainDrops:  rainDrops,
            times:      times,
            expectRain: expectRain
        });
  }

})
