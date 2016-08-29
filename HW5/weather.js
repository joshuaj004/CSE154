// Josh Johnson 
// CSE 154 Section AF Chris Shin
(function () {
	"use strict";
	var weatherURL = "https://webster.cs.washington.edu/cse154/weather.php?";
	var xmlDoc;

	window.onload = function() {
		var ajax = new XMLHttpRequest();
		ajax.onload = cityTest;
		ajax.open("GET", weatherURL + "mode=cities", true);
		ajax.send();
		document.getElementById("loadingnames").style.display = 'none';
		document.getElementById("search").onclick = searchTest;
		document.getElementById("slider").onchange = slideAux;		 
	};

	// This is a function that gets the city list for the textbox.
	function cityTest() {
		var cities = this.responseText;
		var cityArray = cities.split("\n");
		var cityOptions = document.getElementById("cities");
		var options = "";
		for (var i = 0; i < cityArray.length; i++) {
			options += "<option>" + cityArray[i] + "</option>";
		}
		cityOptions.innerHTML = options;
	}

	// This function sends out the request for the daily and weekly weather
	function searchTest() {
		document.getElementById("loadingnames").style.display = '';
		var city = document.getElementById("citiesinput").value;
		var ajax = new XMLHttpRequest();
		ajax.onload = currentDay;
		ajax.open("GET", weatherURL + "mode=oneday&city=" + city, true);
		ajax.send();

		var weekAjax = new XMLHttpRequest();
		weekAjax.onload = initialWeek;
		weekAjax.open("GET", weatherURL + "mode=week&city=" + city, true);
		weekAjax.send();
	}

	// This function gets the responseXML for the day's weather
	function currentDay() {
		document.getElementById("loadingnames").style.display = 'none';
		xmlDoc = this.responseXML;
		document.getElementById("resultsarea").style.display = '';
		dayChange(4);
	}

	// This is an auxiliary function that acts a liason between the slide
	// value and the dayChange function
	function slideAux() {
		dayChange(this.value/3);
	}

	// This function handles the change of current temp and weather.
	function dayChange(slideNum) {
		document.getElementById("resultsarea").style.display = '';
		var day = xmlDoc.getElementsByTagName("time");
		var dayInfo = day[slideNum].children;
		var name = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
		document.getElementById("location").innerHTML = "<p class=location>" + name + "</p>";
		document.getElementById("location").innerHTML += "\n" + "<p class=location>" + Date() + "</p>";
		var currentWeather = dayInfo[0].getAttribute("description");
		document.getElementById("location").innerHTML += "<p class=location>" + currentWeather + "</p>";
		document.getElementById("loadinglocation").style.display = 'none';
		var currentTemp = dayInfo[1].innerHTML;
		document.getElementById("currentTemp").innerHTML = Math.round(currentTemp) + "&#8457;";
		document.getElementById("loadinggraph").style.display = 'none';
	}

	// This sets up the rows for the weekly weather table.
	function initialWeek() {
		document.getElementById("loadingforecast").style.display = 'none';
		var array = JSON.parse(this.responseText);
		document.getElementById("forecast").innerHTML = "";
		var icons = document.getElementById("forecast").insertRow(0);
		var temps = document.getElementById("forecast").insertRow(1);
		for (var i = 0; i < array["weather"].length; i++) {
			var icon = "https://openweathermap.org/img/w/" + array["weather"][i]["icon"] + ".png";
			var tempIcon = icons.insertCell(i);
			tempIcon.innerHTML = "<img src=\"" + icon + "\"alt=\"...\">";
			var tempTemp = temps.insertCell(i);
			tempTemp.innerHTML = "<p>" + Math.round(array["weather"][i]["temperature"]) + "&#176;" + "</p>";
		}
	}
}());