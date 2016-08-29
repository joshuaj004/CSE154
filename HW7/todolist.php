<!DOCTYPE html>
<!--
Josh Johnson
CSE 154
Section AF
Chris Shin
This is the todolist page. The default items are replaced
with whatever stuff the specific user has entered into
their list. Uses the common.php file.
-->
<html>
	<head>
		<meta charset="utf-8" />
		<title>Remember the Cow</title>
		<link href="https://webster.cs.washington.edu/css/cow-provided.css" type="text/css" rel="stylesheet" />
		<link href="cow.css" type="text/css" rel="stylesheet" />
		<link href="https://webster.cs.washington.edu/images/todolist/favicon.ico" type="image/ico" rel="shortcut icon" />
	</head>

	<body>
		<div class="headfoot">
			<h1>
				<img src="https://webster.cs.washington.edu/images/todolist/logo.gif" alt="logo" />
				Remember<br />the Cow
			</h1>
		</div>
        
        <?php 
            include("common.php");
            checkStart();
            $name = $_SESSION["name"];
        ?>
        
		<div id="main">
			<h2><?php echo $name ?>'s To-Do List</h2>

			<ul id="todolist">
            <?php 
                /*
                This part does the main 'heavy-lifting' of the file.
                It reads the personalized file and, if it exists,
                goes through line-by-line and prints out whatever
                the user typed in.
                */
                $todoName = "todo_$name.txt";
                if (file_exists($todoName)) {
                    $file = file($todoName, FILE_IGNORE_NEW_LINES);
                    for ($i = 0; $i < count($file); $i++) {
            ?>
                        <li>
                            <form action="submit.php" method="post">
                                <input type="hidden" name="action" value="delete" />
                                <input type="hidden" name="index" value="<?=$i ?>" />
                                <input type="submit" value="Delete" />
                            </form>
                            <?php echo htmlspecialchars($file[$i]) ?>
                        </li>
            <?php 
                    } 
                } 
            ?>
                
                <li>
                    <form action="submit.php" method="post">
                        <input type="hidden" name="action" value="add" />
                        <input name="item" type="text" size="25" autofocus="autofocus" />
                        <input type="submit" value="Add" />
                    </form>
                </li>
			</ul>

			<div>
				<a href="logout.php"><strong>Log Out</strong></a>
				<?php
                    if (isset($_COOKIE["date"])) {
                ?>
                <p>
                    <em>(last login from this computer was <?=$_COOKIE["date"] ?>)</em>
                </p>
                <?php
                    } 
                ?>
			</div>

		</div>

		<div class="headfoot">
			<p>
				&quot;Remember The Cow is nice, but it's a total copy of another site.&quot; - PCWorld<br />
				All pages and content &copy; Copyright CowPie Inc.
			</p>

			<div id="w3c">
				<a href="https://webster.cs.washington.edu/validate-html.php">
					<img src="https://webster.cs.washington.edu/images/w3c-html.png" alt="Valid HTML" /></a>
				<a href="https://webster.cs.washington.edu/validate-css.php">
					<img src="https://webster.cs.washington.edu/images/w3c-css.png" alt="Valid CSS" /></a>
			</div>
		</div>
	</body>
</html>
