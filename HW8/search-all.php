<?php
/*
Josh Johnson
CSE 154
Section AF
Chris Shin
This function finds all the movies an actor has been in. Uses my
login + password and calls the table function on the results. If 
the actor is not found, the user is notified.
*/
$firstname = $_GET["firstname"];
$lastname = $_GET["lastname"];
include("common.php");
$db = new PDO("mysql:dbname=imdb;host=localhost;", "joshj004", "VilHtAciqu");
$ids = search($firstname, $lastname, $db);
if ($ids->rowCount() >= 1) {
	$id = $ids->fetch()["id"];
	$results = $db->query("SELECT name, year 
                        FROM movies 
                        JOIN roles ON movie_id = id 
                        WHERE actor_id = $id 
                        ORDER BY year DESC, name ASC");
	table($firstname, $lastname, "All Films", $results);
} else {
	?>
	<p>Actor <?= "$firstname $lastname"?> not found.</p>
	<?php
}
forms();
footer();
?>