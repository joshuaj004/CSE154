"use strict";
var collision = false;

window.onload = function() {
	var otherwalls = document.querySelectorAll("div.boundary");
	for (var i = 0; i < otherwalls.length; i++) {
		otherwalls[i].onmouseover = wallsColor;
	}



	var end = document.getElementById("end");
	end.onmouseover = endMessage;

	var start = document.getElementById("start");
	start.onclick = restart;

};

function wallsColor(event) {
	var otherwalls = document.querySelectorAll("div.boundary");
	for (var i = 0; i < otherwalls.length; i++) {
		otherwalls[i].classList.add("youlose");
	}
	collision = true;
}

function endMessage (event) {
	//collision ? alert("Sorry, you lost. :[") : alert("You win! :]");
	if (collision) {
		//alert("Sorry, you lost. :[");
		//status.innerText = "Sorry, you lost. :[";
		document.getElementById("status").innerHTML = "Sorry, you lost. :[";
	} else {
		//alert("You win! :]");
		//status.innerText = "You win! :]";
		document.getElementById("status").innerHTML = "You win! :]";
	}
}

function restart(event) {
	collision = false;
	var otherwalls = document.querySelectorAll("div.boundary");
	for (var i = 0; i < otherwalls.length; i++) {
		otherwalls[i].classList.remove("youlose");
	}
	document.getElementById("status").innerHTML = "Move your mouse over the \"S\" to begin.";
}