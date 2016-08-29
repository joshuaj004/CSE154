<?php
/*
Josh Johnson
CSE 154
Section AF
Chris Shin
This is the submit file. It checks to see if the user is 
adding or removing a post. It opens up the user's personal
todo_(theirName).txt and edits the list in there. Uses
the common.php file to check if there exists a name.
*/
    include("common.php");
    checkStart();
    $name = $_SESSION["name"];
    $todoName = "todo_$name.txt";
    # Checks if there is an action sent.
    if (isset($_POST["action"])) {
        $action = $_POST["action"];
        if ($action == "add") {
            $item = $_POST["item"];
            # A simple append to the user's file.
            file_put_contents($todoName, "$item" . PHP_EOL, FILE_APPEND);
        } else if ($action == "delete") {
            $index = $_POST["index"];
            $text = file($todoName);
            # Removes the element from the array
            unset($text[$index]);
            # Accounts for the fact that altough unset removes the element,
            # it does nothing to fix the subsequent index mismatching.
            $text = array_values($text);
            file_put_contents($todoName, $text);
        }
        header("Location: todolist.php");
        die();
    }
?>