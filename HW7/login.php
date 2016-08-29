<?php 
/*
Josh Johnson
CSE 154
Section AF
Chris Shin
This is the log in file. It gets the entered username and 
password. If the user doesn't exist, provided they match the magic, 
and very arbitrary, regex, they will be entered into the super secure 
users.txt file.
*/
    include ("common.php");
    checkList();
	$password = $_POST["password"];
	$name = $_POST["name"];		
	if (empty($name) || empty($password)) {
        die("You messed up. Put in both a username and password.");
	}
    $users = file("users.txt", FILE_IGNORE_NEW_LINES);
    foreach ($users as $line) {
        // Splits into max of 2 because we actually allow
        // colons in passwords for /some/ reason.
		list($user, $userPassword) = explode(":", $line, 2);
		if ($user == $name && $password == $userPassword) {
			login($name);
		} else if ($user == $name){
            header ("Location: start.php");
			die("Incorrect password");
		}
	}
    
    if (preg_match("/^[a-z][a-z0-9]{2,7}$/", $username) && preg_match("/^[0-9].{4,10}[^a-z0-9]$/", $password)) {
		file_put_contents("users.txt", "$username:$password", FILE_APPEND);
		login($username);
	} else {
		header ("Location: start.php");
		die();
	}	
    
    /*
    This function just creates a session with the user name, sets the 
    timezone because PHP screams if you don't, LA chosen for West Coast
    Reason (WCR), and sets a cookie, which expires in a week, as per the
    spec sheet. Redirects to the todolist page after login.
    */
    function login($name) {
        $_SESSION["name"] = $name;
        date_default_timezone_set('America/Los_Angeles');
        setcookie("date", date("D y M d, g:i:s a"), time() + 60 * 60 * 24 * 7);
        header ("Location: todolist.php");
        die();
    }
?>