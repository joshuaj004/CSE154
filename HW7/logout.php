<?php
/*
Josh Johnson
CSE 154
Section AF
Chris Shin
This is the logout file. A very simple file that checks if the 
user is logged in, logs them out, and sends the user back to
the start page. Uses common.php.
*/
    include ("common.php");
    checkStart();
    session_destroy();
    header("Location: start.php");
    die();
?>