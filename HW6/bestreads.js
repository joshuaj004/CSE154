// bestreads.js
/*
Josh Johnson 
Section 154
Chris Shin
This is the javascript for a program that populates the page with books and their covers.
If a book is clicked, further information and reviews are provided.
*/
(function() {
	"use strict";

	window.onload = function() {
		document.getElementById("singlebook").style.display = 'none';
		document.getElementById("allbooks").innerHTML = "";
		pageReset();
		document.getElementById("back").onclick = backFunc;
	};

	// This function is an auxiliary function for the back button to reset the page.
	function backFunc() {
		pageReset();
	}

	// This function is called when a book is clicked. It handles all the ajax requests.
	function whatClicked(evt) {
    	var info = document.getElementById(this.id).innerHTML;
    	document.getElementById("singlebook").style.display = '';
    	var currentBook = document.getElementById(this.id);
    	var image = document.getElementById("cover");
    	image.setAttribute("src", "books/" + this.id + "/cover.jpg");
    	document.getElementById("allbooks").innerHTML = "";
    	var infoURL = "https://webster.cs.washington.edu/students/joshj004/hw6/bestreads.php?mode=info&title=" + this.id;	
		var ajaxinfo = new XMLHttpRequest();
		ajaxinfo.open("GET", infoURL, true);
		ajaxinfo.send();
		ajaxinfo.onload = infoMethod;

		var descURL = "https://webster.cs.washington.edu/students/joshj004/hw6/bestreads.php?mode=description&title=" + this.id;	
		var ajaxdesc = new XMLHttpRequest();
		ajaxdesc.open("GET", descURL, true);
		ajaxdesc.send();
		ajaxdesc.onload = descMethod;

		var reviewsURL = "https://webster.cs.washington.edu/students/joshj004/hw6/bestreads.php?mode=reviews&title=" + this.id;	
		var ajaxreviews = new XMLHttpRequest();
		ajaxreviews.open("GET", reviewsURL, true);
		ajaxreviews.send();
		ajaxreviews.onload = reviewsMethod;
	}

	// This function sets the reviews for a specific book.
	function reviewsMethod() {
		document.getElementById("reviews").innerHTML = this.responseText;
	}

	// This method sets the description for the book.
	function descMethod() {
		document.getElementById("description").innerHTML = this.responseText;
	}

	// This function gets all the basic info for a book.
	function infoMethod() {
		var info = JSON.parse(this.responseText);
		document.getElementById("title").innerHTML = info.title;
		document.getElementById("author").innerHTML = info.author;
		document.getElementById("stars").innerHTML = info.stars;
	}

	// This sets up the inital book grid when the page is loaded or the back button is pressed.
	function bookGrid() {
		document.getElementById("allbooks").innerHTML = "";
		document.getElementById("singlebook").style.display = 'none';
		var bookXML = this.responseXML;
		var books = bookXML.getElementsByTagName("book");
		for (var i = 0; i < books.length; i++) {
			var folder = books[i].childNodes[1].innerHTML;
			var bookDiv = document.createElement("div");
			var image = document.createElement("img");
			image.setAttribute("src", "books/" + folder + "/cover.jpg");
			image.setAttribute("alt", folder);
			bookDiv.appendChild(image);
			var title = document.createElement("p");
			title.innerHTML = (books[i].childNodes[0].innerHTML);
			bookDiv.appendChild(title);
			bookDiv.setAttribute("id", folder);
			bookDiv.addEventListener("click", whatClicked, false);
			document.getElementById("allbooks").appendChild(bookDiv);
		}
	}

	// This is the function that deals with the ajax request for the book grid.
	function pageReset() {
		var testurl = "https://webster.cs.washington.edu/students/joshj004/hw6/bestreads.php?mode=books";	
		var ajax = new XMLHttpRequest();
		ajax.open("GET", testurl, true);
		ajax.send();
		ajax.onload = bookGrid;
	}

}());