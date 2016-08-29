/*
This is the javascript file that pairs with speedreader.html It handles the dynamic
aspect of the website.
*/
"use strict"; 
var array;
var index;	
var timer;
var speed;

// This function is loaded on the page load and 'sets-up' the page
window.onload = function() {
	var start = document.getElementById("start");
	start.onclick = startButton;

	var stop = document.getElementById("stop");
	stop.disabled = true;
	stop.onclick = stopButton;

	var radios = document.getElementsByTagName("input");
	for (var i = 0; i < radios.length; i++) {
		radios[i].onclick = radioButtons;
	}

	var drop = document.getElementById("speed");
	drop.onchange = dropDown;
    
    dropDown();
};

// This function is called when the start button is pressed. It disables the start button,
// enables the stop button, and starts the reading process
function startButton(event) {
	document.getElementById("start").disabled = true;
	document.getElementById("stop").disabled = false;
	var usertext = document.getElementById('usertext').value;
	array = usertext.split(" ");
	index = 0;
	timer = setInterval(wordPicker, speed);
}

// This function is the one called every $speed miliseconds. It makes sure that the word 
// at array[index] is not null. If the word has punctuation, the punctuation is removed
// and a copy of the word without punctuation is added into the array, so that the word
// is effectively displayed for twice as long.
function wordPicker() {
	if (array[index] !== null) {
        var baseword = array[index];
        var modified = baseword.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
		setText(modified);
        if (baseword != modified) {
            array.splice(index+1, 0, modified);
        }
		index++;
	}	
}

// This function takes in a string and replaces the readingbox div with the 
// inputted text.
function setText (textString) {
	var text = document.getElementsByClassName("readingbox");
	text[0].innerHTML = textString;
}

// This function is called when the stop button is pressed. It disables the stop button
// and enables the start button. It also stops timers and resets the array index to 0.
function stopButton(event) {
	document.getElementById("stop").disabled = true;
	document.getElementById("start").disabled = false;
	setText("");
	clearTimeout(timer);
    index = 0;
}

// This function keeps track of the radio buttons. It switches the text size to 
// correspond to which button is pressed.
function radioButtons(event) {
	var radios = document.getElementsByTagName("input");
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			var text = document.getElementsByClassName("readingbox");
            text[0].style.fontSize = radios[i].value;
		}
	}
}

// This function keeps track of the drop down menu. It changes the speed accordingly.
function dropDown(event) {
	var drop = document.getElementById("speed");
	speed = drop.options[drop.selectedIndex].value;
    clearTimeout(timer);
    if (index > 0) {
        timer = setInterval(wordPicker, speed);    
    }
}