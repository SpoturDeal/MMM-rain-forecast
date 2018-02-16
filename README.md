# MMM-rain-forecast
A <a href="https://github.com/MichMich/MagicMirror">MagicMirror</a> module forecast rain in the Netherlands.

This module is originally made by Cirdan, many thanks for his great work.
I had to adapt because the sparkline did not work on my Mirror.

I have removed the sparkline and replaced it by a real fast Scalable Vector Graphic
the Module has no more dependency on jQuery or Sparkline.


## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/spoturdeal/MMM-rain-forecast.git`.
2. Add the module inside `config.js` placing it where you prefer 


## Config


|Option|Description|
|---|---|
|`lat`|The latitude of your position.<br>**Type:** `Float`<br>**Default:** <i>52.15</i>|
|`lon`|The longitude of your position.<br>**Type:** `Float`<br>**Default:** <i>5.5</i>|
|`pleaseWit`| The text while waiting for data.. <br>**Type:** `string`<br>**Default:** <i>Please wait</i>
|`noRainText`| The text displayed if there is no rain. <br>**Type:** `string`<br>**Default:** <i>Until %s no rain</i><br>**Remark:** write %s where you like to add the time example <i>Until 17:15 no rain </i>

Here is an example of an entry in `config.js`
```
{
	module: "MMM-rain-forecast",
	position: "top_right",   // see mirror setting for options
	header: "Expected rainfall", 
	config: {   
                lat: 52.15,
                lon: 5.5,				
		pleaseWait: "Please wait",
		noRainText: "Until %s no rain"              
	}
}
```
## Language considerations
There is no language file because only 3 text labels are used and every-one can use their own texts

## Screenshots
#### Display type: details
![Screenshot of detail mode](/logoNorain.png?raw=true "No rain")

#### Display type: details 
![Screenshot of detail mode](/logoRain.png?raw=true "Predicted rain")


## Notes
Data provided by <a href="https://www.buienradar.nl/">Buienradar</a>.
- Update every 10 minutes.

## Contributors

<a href="https://github.com/73cirdan/MMM-rainfc">Cirdan</a> For the fantastic base of this module.

## Version

2.1 New graphic fixed color and time labels are now a part of the graphic and added sprintf function to write no rain texts more flexible in different languages.


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
