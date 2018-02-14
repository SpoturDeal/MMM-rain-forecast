/* global Module */

/* Magic Mirror
 * Module: Rain-forecast
 * Displays a scalable vector graph of expected rain for a lon/lat pair based on a Dutch public Api (Buienradar)
 *  https://br-gpsgadget-new.azurewebsites.net/data/raintext?lat=52.15&lon=5.5
 * By Spoturdeal.
 */

Module.register("MMM-rain-forecast",{
	// Default module config.
	defaults: {
		lat: 52.15,
        lon: 5.5,
        updateInterval: 10 * 60 * 1000, // every 10 minutes
		animationSpeed: 1000,
		lang: config.language,
		initialLoadDelay: 0, // 0 seconds delay
		lineColor: "#0074d9",
        fillColor: "#0074d9",		
		width: 200,
		height: 150,
		showConsumption: false
	},
    // Override start method.
	start: function() {
		Log.log("Starting module: " + this.name);
		this.payload = false;
		this.sendSocketNotification("RAIN_REQUEST", {
			updateInterval: 60000,  
            apiBase: "https://br-gpsgadget-new.azurewebsites.net",
            endpoint: "data/raintext",
            lat: this.config.lat,
            lon: this.config.lon,
		});

	},
	// Define required scripts.
	getScripts: function() {
		return [];
	},

	// Define required scripts.
	getStyles: function() {
		return ["MMM-rain-forecast.css"];
	},
	socketNotificationReceived: function(notification, payload) {
    	
        if (notification == "ERROR") {
			document.getElementById("sparkler").innerHTML=payload.error;
			return;
		}
	    var numberTimeLabels = this.config.nrOfTimeLabels ? this.config.nrOfTimeLabels : 0;
			
        if (!payload.times || payload.times.length == 0) {
            document.getElementById("sparkler").innerHTML="No Data";
            this.emptyCols(numberTimeLabels);
            return;
        }
        if (payload.expectRain == 0) {
            // no rain calculated from data 
            noRainText = this.config.noRainText ? this.config.noRainText : "No rain until: ";
            document.getElementById("sparkler").innerHTML=noRainText + payload.times[payload.times.length-1];
            this.emptyCols(numberTimeLabels);
        } else {
            if (numberTimeLabels>0) {
                interval = Math.floor(payload.times.length / (numberTimeLabels-1));
                for (i = 0; i < numberTimeLabels; i++) {
                    if (i==0) { document.getElementById("labelcol0").innerHTML = payload.times[0]; }
                    else if (i+1==numberTimeLabels) { document.getElementById("labelcol"+i).innerHTML= payload.times[payload.times.length-1]; }
                    else { document.getElementById("labelcol"+i).innerHTML = payload.times[i*interval]; }
                }
            } else {
                this.emptyCols(numberTimeLabels);
                rainText = this.config.rainText ? this.config.rainText : "Forecast until: ";
                document.getElementById("textrow").unnerHTML = rainText + payload.times[payload.times.length-1];
            }
            
            document.getElementById('sparkler').innerHTML = this.makeSVG(payload.rainDrops)
        }
    },
	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("table");
		wrapper.align = "center";
		wrapper.style.cssText = "width: " + this.config.width + "px";
		var numberTimeLabels = this.config.nrOfTimeLabels ? this.config.nrOfTimeLabels : 0;

		if (numberTimeLabels==0) {
			var currentRow = document.createElement("tr");
			var textrow = document.createElement("td");
			textrow.className = "normal rfc_textrow";
			textrow.setAttribute("colspan", numberTimeLabels)
			textrow.id = "textrow";
			currentRow.appendChild(textrow);
			wrapper.appendChild(currentRow);
		}

		var graphRow = document.createElement("tr");
		var graph = document.createElement("td");
		graph.colSpan = numberTimeLabels;
        graph.id = "sparkler";
		graph.className = "small thin light";
		graph.innerHTML = "Een ogenblik a.u.b.";
		graphRow.appendChild(graph);
		wrapper.appendChild(graphRow);

		if (numberTimeLabels>0) {
			var botRow = document.createElement("tr");
			for (i = 0; i < numberTimeLabels; i++) {
				var labelcol = document.createElement("td");
				labelcol.className = "xsmall thin light rfc_labelrow";
				labelcol.id = "labelcol"+i;
				
				if (i==0) { labelcol.style.textAlign="left"; }
				else if (i+1==numberTimeLabels) { labelcol.style.textAlign="right"; }
				else { labelcol.style.textAlign="center"; }
				
				botRow.appendChild(labelcol);
			}
			wrapper.appendChild(botRow);
		}

		return wrapper;
	},
    emptyCols: function(cnt){
        for (i = 0; i < cnt; i++) {
           document.getElementById("labelcol"+i).innerHTML="";
        }
        return;
    },
    makeSVG: function(raining){
        var setPoints='0,220';
        var xAs=1;
        for (i=0;i<raining.length;i++){
            xAs=(xAs==1?xAs=2:xAs+20);         
            setPoints += ' ' + xAs + ',' + (220-raining[i]); 
        }
        xAs++;
        setPoints +=' ' + xAs + ',220';
        var svg='<svg viewBox="0 0 400 100" class="chart"> <polyline fill="'+this.config.fillColor+'" stroke="'+this.config.lineColor+'" stroke-width="2" points="' + setPoints + '"   />';
        return svg;
    }
});
