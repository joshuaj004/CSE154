<?php
/*
Josh Johnson
CSE 154
Section AF
Chris Shin
This is the search Kevin file. It gets the entered firstname and 
lastname. If the actor doesn't exist, it will say that. If the actor wasn'table
in any shared movies with kevin bacon, it will say that too. Finally,
if the two actors are in any shared movies, it will list out the moives by the 
year they came out (most recent) and if those are identical, if seperates them
by the name.
*/
$firstname = $_GET["firstname"];
$lastname = $_GET["lastname"];
include("common.php");
$db = new PDO("mysql:dbname=imdb;host=localhost;", "joshj004", "VilHtAciqu");
$ids = search($firstname, $lastname, $db);
if ($ids->rowCount() >= 1) {
	$id = $ids->fetch()["id"];
	$results = $db->query("SELECT movies.year, movies.name FROM movies
						JOIN roles rA ON rA.movie_id = movies.id
						JOIN roles rB ON rB.movie_id = movies.id
						JOIN actors aA ON aA.id = rA.actor_id
						JOIN actors aB ON aB.id = rB.actor_id
						WHERE aB.first_name = 'Kevin' 
                        AND aB.last_name = 'Bacon'
						AND aA.id = $id
						AND rA.movie_id = rB.movie_id
						ORDER BY movies.year DESC, movies.name ASC");
	if ($results->rowCount() == 0) { ?>
		<p><?php "$firstname $lastname "?> wasn't in any films with Kevin Bacon</p>
	<?php } else {
		table($firstname, $lastname, "Films with $firstname $lastname and Kevin Bacon", $results);
	}	
} else { ?>
	<p>Actor <?= "$firstname $lastname" ?> not found.</P>
	<?php
}
forms();
footer();
?>