
var date_field;
var color_field;
var meter;

var color_data

var paused = false;

var R = 0,G = 0,B = 0;

var color_text_mode = 0;

var random_sum = 0;
var color_sum_step = 100;

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function betterTime(time){
	if(time < 10){
		return "0" + time;
	}else{
		return "" + time;
	}
}

function colorEvent() {
	
	var finalText = rgbToHex(R,G,B);
	switch(color_text_mode){
		case 0:
			finalText = ntc.name(finalText)[1];
			break;
		case 1:
			break;
		case 2:
			finalText = color_data;
			break;
	}
	
	color_field.innerHTML = finalText;
	document.title = finalText;

	if(paused){ return; }

	var currentdate = new Date();
	var datetime = betterTime(currentdate.getHours()) + ":"  
                + betterTime(currentdate.getMinutes()) + ":" 
                + betterTime(currentdate.getSeconds());
	date_field.innerHTML = datetime;

	random_sum = Math.round(Math.random()*color_sum_step);

	//Apply sum
	randomRGB = Math.random();
	if(randomRGB < 0.33){
		R += random_sum;
		if(R > 255){
			R = R-255;
		}
	}else if(randomRGB >= 0.33 && randomRGB < 0.66){
		G += random_sum;
		if(G > 255){
			G = G-255;
		}
	}else{
		B += random_sum;
		if(B > 255){
			B = B-255;
		}
	}

	color_data = "rgb("+R+","+G+","+B+");";
	document.body.style.backgroundColor = rgbToHex(R,G,B);

	var finalText = rgbToHex(R,G,B);
	switch(color_text_mode){
		case 0:
			finalText = ntc.name(finalText)[1];
			break;
		case 1:
			break;
		case 2:
			finalText = color_data;
			break;
	}
	
	color_field.innerHTML = finalText;
	document.title = finalText;
}

window.onload=function(){
	date_field = document.getElementById("date_field");
	color_field = document.getElementById("color_field");
	meter = document.getElementById("color_meter");
	R = Math.round(Math.random()*256);
	G = Math.round(Math.random()*256);
	B = Math.round(Math.random()*256);
	window.setInterval(colorEvent,1000);
	console.log("started");
	colorEvent();
}

function processClick(e){
	var target = (e && e.target) || (event && event.srcElement);
	if(target != color_field){
		paused = !paused;
		date_field.innerHTML = "paused";
	}else{
		if(color_text_mode < 2){
			color_text_mode++;
		}else{
			color_text_mode = 0;
		}
		
		if(document.documentElement.clientWidth > 450){
			switch(color_text_mode){
				case 0:
					meter.style.width = "150px";
					break;
				case 1:
					meter.style.width = "100px";
					break;
				case 2:
					meter.style.width = "165px";
					break;
				default:
					meter.style.width = "100px";
			}
		}
	}
	colorEvent();
}

document.onclick=processClick;
