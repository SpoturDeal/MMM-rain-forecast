# MMM-rain-forecast
A <a href="https://github.com/MichMich/MagicMirror">MagicMirror</a> module forecast rain in the Netherlands.

This module is originally made By Cirdan, many thanks for his great work.
I had to adapt because the sparkline did not work on my Mirror.

I have removed the sparkline and replaced it by a real fast Scalable Vector Graphic
the Module has no more dependency on jQuery or Sparkline.


## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/spoturdeal/MMM-rain-forecast.git`.
2. Add the module inside `config.js` placing it where you prefer ;)


## Config


|Option|Description|
|---|---|
|`lat`|The latitude of your position.<br>**Type:** `Float`<br>**Default:** <i>52.15</i>|
|`lon`|The longitude of your position.<br>**Type:** `Float`<br>**Default:** <i>5.5</i>|
|`width`|The width of the graphic presentation.<br>**Type:** `integer`<br>**Default:** <i>200</i>|
|`height`| The height of the graphic presentation. <br> **Type** `integer` <br> **Default** <i>150</i> |
|`lineColor`| The color of te line in the graphic. <br>**Type:** `string`<br>**Options:** `#any color you like`<br/>**Default:** <i>#0074d9</i> light blue
|`fillColor`| The color of the area in the graphic. <br>**Type:** `string`<br>**Options:** 'none, #any color you like'<br/>**Default:** <i>0074d9</i> light blue
|`rainText`| If there is no graphic the text when the rain ends.. <br>**Type:** `string`<br>**Default:** <i>Rain until:</i>
|`noRainText`| The text displayed if there is no rain. <br>**Type:** `string`<br>**Default:** <i>No rain until:</i>

Here is an example of an entry in `config.js`
```
{
	module: "MMM-rain-forecast",
	position: "top_right",   // see mirror setting for options
	config: {   
                lat: 52.15,
                lon: 5.5				
	        width: 200,
		height: 150,
		lineColor: "#0074d9",
		fillColor: "#0074d9",
		rainText: "Tot: ",
		noRainText: "Geen regen tot: "              
	}
}
```

## Screenshots
#### Display type: details
![Screenshot of detail mode](/logoNorain.png?raw=true "Included assets")

#### Display type: details 
![Screenshot of detail mode](/logoRain.png?raw=true "Included assets")


## Notes
Data provided by <a href="https://www.buienradar.nl/">Buienradar</a>.
- Endpoints update every 10 minutes.

## Contributors

<a href="https://github.com/73cirdan/MMM-rainfc">Cirdan</a> For the fantastic base of this module.

The MIT License (MIT)
=====================

Copyright © 2018 SpoturDeal - Carl 

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability,
fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability,
whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
