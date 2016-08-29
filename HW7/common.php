<?php
/*
Josh Johnson
CSE 154
Section AF
Chris Shin
This is the common file. It contains the handy-dandy functions
that various other php files use.
*/
    /*
    This function gets the cookie info, and if the name is set,
    the user is redirected to the todolist page.
    */
    function checkList() {
        session_start();
        if (isset($_SESSION["name"])) {
            header("Location: todolist.php");
        }
    }
    
    /*
    This function gets the cookie info, and if the name is NOT set,
    the user is redirected to the start page. Super straight forward stuff.
    */
    function checkStart() {
        session_start();
        if (!isset($_SESSION["name"])) {
            header("Location: start.php");
        }
    }
?>