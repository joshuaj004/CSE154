// CSE 154 Ajax section pre-problem
// You should complete this file.
// Your code must be run on the Webster server (not on your local computer).

window.onload = function() {
	document.getElementById("go").onclick = goClick;
};

function goClick() {
	// write your solution here!
	// Your code needs to connect to: https://webster.cs.washington.edu/cse154/sections/9/horoscope-server.php
    var day = document.getElementById("day").value;
    var month = document.getElementById("month").value;
    var ajax = new XMLHttpRequest();
    ajax.onload = tempFunc;
    ajax.open("GET", "https://webster.cs.washington.edu/cse154/sections/9/horoscope/horoscope-server.php?month=" + month + "&day=" + day, true);
    ajax.send();
}

function tempFunc() {
    document.getElementById("results").innerHTML = this.responseText;
}