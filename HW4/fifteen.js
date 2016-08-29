// Josh Johnson CSE 154 AF Chris Shin
(function() {
	"use strict"

	var row;
	var column;

	window.onload = function() {
		puzzleSplitter();
		gridMaker();
		backgroundChoices();
		document.getElementById("shufflebutton").onclick = shuffle;
	};

	// This function splits the puzzle into puzzlepieces. It takes care
	// of the mouse moving over/out, the tile moving and the inner HTML.
	function puzzleSplitter() {
		var mainPuzzle = document.getElementById("puzzlearea");
		for (var i=1; i < 16; i++) {
			var tempTile = document.createElement("div");
			tempTile.className = "puzzlePiece";
			tempTile.innerHTML = i;
			tempTile.onmouseover = over;
			tempTile.onmouseout = out;
			tempTile.onclick = moveAssist;
			puzzlearea.appendChild(tempTile);
		}
	}

	// This function makes the grid and assigns the square IDs
	function gridMaker(){
		var tiles = document.querySelectorAll("#puzzlearea .puzzlePiece");
		for (var i = 0; i < tiles.length; i++) {
			var x = ((i) % 4);
			var y = Math.floor((i) / 4);
			tiles[i].style.left = (x * 100) + "px";
			tiles[i].style.top = (y * 100) + "px";
			tiles[i].style.backgroundPosition = -(x * 100) + "px " + -(y * 100) + "px";
			tiles[i].id = "square_" + x + "_" + y;  
		}
		row = "300px";
		column = "300px";
	}

	// This is just an auxiliary function for using the move method.
	// I found that this made more logical sense than refactoring the move method.
	function moveAssist() {
		move(this);
	}

	// This is the move method. It checks to see if the tile can move, and if so
	// it moves the tile.
	function move(tileInput) {
		if (canMove(tileInput)) {
			var id = tileInput.id.split("_");
			var tile = document.getElementById(tileInput.id);
			var tempRow = id[1]*100 + "px";
			var tempColumn = id[2]*100 + "px";
			tile.style.left = row;
			tile.style.top = column;
			tileInput.id = "square_" + row.substring(0, 1) + "_" + column.substring(0,1);
			row = tempRow;
			column = tempColumn;
		}	
	}

	// This method checks if the tile can move. It makes sure that the tile is not
	// diagonal, hence why it may seem a bit complicated.
	function canMove(tile) {
		var id = tile.id.split("_");
		var freeX = row.substring(0, 1);
		var freeY = column.substring(0, 1);
		var firstCheck = (Math.abs(id[1] - freeX) <= 1 && Math.abs(id[2] - freeY) <= 1);
		var diagTopLeft = ((parseInt(freeX) + 1) == id[1]) && ((parseInt(freeY) - 1) == id[2]);
		var diagTopRight = ((parseInt(freeX) - 1) == id[1]) && ((parseInt(freeY) - 1) == id[2]);
		var diagBottomLeft = ((parseInt(freeX) + 1) == id[1]) && ((parseInt(freeY) + 1) == id[2]);
		var diagBottomRight = ((parseInt(freeX) - 1) == id[1]) && ((parseInt(freeY) + 1) == id[2]);
		return (firstCheck && !(diagTopLeft || diagTopRight || diagBottomLeft || diagBottomRight));
	}

	// Shuffles the board by moving 1000 times. Checks which tiles can move and 
	// randomily picks 1 to move.
	function shuffle() {
		for (var i = 0; i < 1000; i++) {
			var neighborsArray = getNeighbors();
			var randomNeighbor = neighborsArray[Math.floor(Math.random()*neighborsArray.length)];
			move(randomNeighbor);
		}
	}

	// Returns an array of the all the possible tiles that can move
	// in the puzzle grid.
	function getNeighbors() {
		var tiles = document.querySelectorAll("#puzzlearea .puzzlePiece");
		var neighborsArray = [];
		for (var i = 0; i < tiles.length; i++) {
			if (canMove(tiles[i])) {
				neighborsArray.push(tiles[i]);
			}
		}
		return neighborsArray;
	}

	// This function makes the mouse red and pointer if the tile 
	// it's over can move.
	function over() {
		if (canMove(this)) {
			this.style.borderColor = "red";	
			this.style.cursor = "pointer";
		}	
	}

	// When the mouse cursor exits a tile, it defaults to black due to this method.
	function out() {
		this.style.borderColor = "black";	
		this.style.cursor = "default";
	}	

	// Sets up the options for the backgrounds. Extra Credit Option.
	// Appends the drop down list next to the shuffle button.
	function backgroundChoices() {
		var controls = document.getElementById("controls");
		var list = document.createElement("select");
		var backgrounds = ["chrome", "happy", "pear", "x"];
		for (var i = 0; i < backgrounds.length; i++) {
			var background = document.createElement("option");
			background.value = backgrounds[i];
			background.innerHTML = backgrounds[i];
			list.appendChild(background);
		}
		list.onchange = backgroundChange;
		list.id = "backgroundChoices";
		controls.appendChild(list);
	}

	// acutally changes the background. Gets the selected option and generates the relative url.
	function backgroundChange() {
		var backgrounds = document.getElementById("backgroundChoices");
		var sqaures = document.getElementsByClassName("puzzlePiece");
		for (var i = 0; i < sqaures.length; i++) {
			var picURL = "url(\'" + backgrounds.options[backgrounds.selectedIndex].text + ".jpg\')";
			sqaures[i].style.backgroundImage = picURL;
		}
	}	

})();