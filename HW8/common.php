<!--
Josh Johnson
CSE 154
Section AF
Chris Shin
This is the my common file, all of the html is pulled straight from
the starter code allison gave us. Contains a couple functions for 
the footer and the forms along with a search and table function.
-->
<!DOCTYPE html>
<html>
	<head>
		<title>My Movie Database (MyMDb)</title>
		<meta charset="utf-8" />
		<link href="https://webster.cs.washington.edu/images/kevinbacon/favicon.png" 
		type="image/png" rel="shortcut icon" />

		<!-- Link to your CSS file that you should edit -->
		<link href="bacon.css" type="text/css" rel="stylesheet" />
	</head>

	<body>
		<div id="frame">
			<div id="banner">
				<a href="mymdb.php">
					<img src="https://webster.cs.washington.edu/images/kevinbacon/mymdb.png" 
					alt="banner logo" />
				</a>
				My Movie Database
			</div>
			<div id="main">
<?php
/*
This simple function displays the footer on the pages.
*/
function footer() { ?>
	<div id="w3c">
		<a href="https://webster.cs.washington.edu/validate-html.php">
			<img src="https://webster.cs.washington.edu/images/w3c-html.png" 
			alt="Valid HTML5" /></a>
		<a href="https://webster.cs.washington.edu/validate-css.php">
			<img src="https://webster.cs.washington.edu/images/w3c-css.png" 
			alt="Valid CSS" /></a>
	</div>
	</div> <!-- end of #frame div -->
	</body>
	</html>
<?php } 
/*
This function displays the forms so that they can easily
be inserted in any page.
*/
function forms() { ?>
	<!-- form to search for every movie by a given actor -->
	<form action="search-all.php" method="get">
		<fieldset>
			<legend>All movies</legend>
			<div>
				<input name="firstname" type="text" size="12" placeholder="first name" 
				autofocus="autofocus" /> 
				<input name="lastname" type="text" size="12" placeholder="last name" /> 
				<input type="submit" value="go" />
			</div>
		</fieldset>
	</form>

	<!-- form to search for movies where a given actor was with Kevin Bacon -->
	<form action="search-kevin.php" method="get">
		<fieldset>
			<legend>Movies with Kevin Bacon</legend>
			<div>
				<input name="firstname" type="text" size="12" placeholder="first name" /> 
				<input name="lastname" type="text" size="12" placeholder="last name" /> 
				<input type="submit" value="go" />
			</div>
		</fieldset>
	</form>
	</div><!-- end of #main div -->
	<?php 
}	

/*
This is the function that gets a single user's information from
the database. It handles the multiple person scenario and returns
a query.
*/
function search($firstname, $lastname, $db) {
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$firstName = $db->quote($firstname);
	$lastName = $db->quote($lastname);
    // Concatenate because of actors with the same names
    // Last names don't matter, so we don't concat them
	return $db->query("SELECT id 
                        FROM actors 
                        WHERE first_name 
                        LIKE CONCAT($firstName, '%') 
                        AND last_name = $lastName 
                        ORDER BY film_count DESC, id ASC LIMIT 1");
} 

/*
This is a function that just displays the table when the information
is recieved and this function is called with the necessary parameters.
*/
function table($firstname, $lastname, $caption, $results) { ?>
	<h1>Results for <?= $firstname . " " . $lastname ?></h1>
	<table>
		<caption><?= $caption ?></caption>
		<tr>
			<th>#</th>
			<th>Title</th>
			<th>Year</th>
		</tr>
		<?php
		$i = 0;
		foreach ($results as $data) {
		?>
		<tr>
			<td><?= $i + 1 ?></td>
			<td><?= $data["name"] ?></td>
			<td><?= $data["year"] ?></td>
		</tr>
		<?php 
		$i++;
		} ?>
	</table>
	<?php 
} 
?>