<?php 
/*
Josh Johnson
CSE 154
Section AF
Chris Shin
This is the 'front page' of my movie database. It includes the common
file and calls the forms and footer functions so that a user can
type in a name.
*/
include("common.php"); ?>
<h1>The One Degree of Kevin Bacon</h1>
<p>Type in an actor's name to see if he/she was ever in a movie with Kevin Bacon!</p>
<p><img src="https://webster.cs.washington.edu/images/kevinbacon/kevin_bacon.jpg" alt="Kevin Bacon" /></p>
<?php 
forms(); 
footer(); 
?>