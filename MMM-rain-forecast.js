/* global Module */

/* Magic Mirror
 * Module: Rain-forecast
 * Version 29th April 2018 decreased by request the width of the graph by 25% was 400px now 305px
 * Displays a scalable vector graph of expected rain for a lon/lat pair based on a Dutch public Api (Buienradar)
 *  https://gpsgadget.buienradar.nl/data/raintext?lat=52.15&lon=5.5
 * By Spoturdeal.
 */
Module.register("MMM-rain-forecast",{
	// Default module config.
	defaults: {
		lat: 52.15,
        lon: 5.5,
		noRainText: 'Until %s no rain',    // write %s where you like to add the time example Until 17:15 no rain
        pleaseWait: 'Please wait',
        fillColour: '#0074d9',
        refreshInterval: 15,  // In minutes will be multiplied by 60 for seconds and 1000 for milliseconds
	},
    // Override start method.
	start: function() {
		Log.log("Starting module: " + this.name);
		this.payload = false;
		this.sendSocketNotification("RAIN_REQUEST", {
			updateInterval: this.config.refreshInterval * 60 * 1000,
            apiBase: "https://graphdata.buienradar.nl",
            endpoint: "forecast/json",
            lat: this.config.lat,
            lon: this.config.lon,
		});

	},
	// Define required scripts. No extra scripts needed
	getScripts: function() {
		return [];
	},
	// Define required styles for chart only.
	getStyles: function() {
		return ["MMM-rain-forecast.css"];
	},
	socketNotificationReceived: function(notification, payload) {
        // was not able to receive data
        if (notification == "ERROR") {
			document.getElementById("sparkler").innerHTML=payload.error;
			return;
		}
        // no data received from node_helper.js
        if (!payload.times || payload.times.length == 0) {
            document.getElementById("sparkler").innerHTML="No Data";
            return;
        }
        // no rain calculated from in node_helper.js
        if (payload.expectRain == 0) {
            noRainText = this.sprintf(this.config.noRainText,payload.times[payload.times.length-1]);
            document.getElementById("sparkler").innerHTML=noRainText
        } else {
            document.getElementById('sparkler').innerHTML = this.makeSVG(payload.rainDrops,payload.times)
        }
    },
	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("table");
		wrapper.align = "center";
		var graphTr = document.createElement("tr");
		var graphTd = document.createElement("td");
    graphTd.id = "sparkler";
		graphTd.className = "small thin light";
		graphTd.innerHTML = this.config.pleaseWait;
		graphTr.appendChild(graphTd);
		wrapper.appendChild(graphTr);
		return wrapper;
	},
    // Make the graphic using SVG
    makeSVG: function(raining,times){
        /* We start at position
         * The table is upside down therefor we calculate the line position down from the top of the canvas
         * received value 77 = 100 - 38 = 72 on the canvas
         * M01,200 is the start
         */
        var setPoints='M01,100';
        // loop through the received data array raining[] normally 24 position 0 to 23
        var xAs=1;
        for (i=0;i<raining.length;i++){
            xAs=Math.round(i*(300/(raining.length-1)));
            setPoints += ', L' + xAs + ',' + (100-raining[i]);
        }
        // End of th3 line make sure it drops to the bottom of the canvas to avoid silly fill
        setPoints +=', L' + xAs + ',100 Z';
        var svg='<svg class="graph" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">';
        //Set grid lines xAs ans yAs size is determined in CSS
        svg+='<g class="grid x-grid" id="xGrid"><line x1="1" x2="1" y1="00" y2="100"></line></g>';
        svg+='<g class="grid y-grid" id="yGrid"><line x1="1" x2="300" y1="100" y2="100"></line></g>';
        //Draw the line with the data
        svg+='<g class="surfaces">';
        svg+='<path class="first_set" style="fill:' + this.config.fillColour + '" d="' + setPoints + '"></path>';
        svg+='</g>';
        // Set the class for the grid
        svg+='<use class="grid double" xlink:href="#xGrid" style=""></use>';
        svg+='<use class="grid double" xlink:href="#yGrid" style=""></use>';
        // Time labels
        svg+='<g class="labels x-labels">';
        svg+='<text x="20"  y="115"  fill="white">' + times[0] + '</text>';
        svg+='<text x="65"  y="115"  fill="white">' + times[6] + '</text>';
        svg+='<text x="120" y="115" fill="white">'  + times[12]+ '</text>';
        svg+='<text x="175" y="115" fill="white">'  + times[18] + '</text>';
        svg+='<text x="230" y="115" fill="white">'  + times[24] + '</text>';
        svg+='<text x="285" y="115" fill="white">'  + times[30] + '</text>';
        svg+='</g></svg>';
        return svg;
    },
    sprintf: function() {
    var args = arguments,
    string = args[0],
    i = 1;
    return string.replace(/%((%)|s|d)/g, function (m) {
        // m is the matched format, e.g. %s, %d
        var val = null;
        if (m[2]) {
            val = m[2];
        } else {
            val = args[i];
            // A switch statement so that the formatter can be extended. Default is %s
            switch (m) {
                case '%d':
                    val = parseFloat(val);
                    if (isNaN(val)) {
                        val = 0;
                    }
                    break;
            }
            i++;
        }
        return val;
    });
}
});
