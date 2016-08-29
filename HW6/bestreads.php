<?php
	# bestreads.php
	# This is my web service.
	# Josh Johnson
	# Section AF Chris Shin

	$mode = $_GET["mode"];
	$title = $_GET["title"];

	if ($mode == 'info') {
		$myfile = fopen("books/$title/info.txt", "r");
		$bookTitle = trim(preg_replace('/\s+/', ' ', fgets($myfile)));
		$author = trim(preg_replace('/\s+/', ' ', fgets($myfile)));
		$stars = fgets($myfile);
		$data = array(
			"title" => $bookTitle,
			"author" => $author,
			"stars" => $stars,
		);
		print json_encode($data);
	} elseif ($mode == 'description') {
		print file_get_contents("books/$title/description.txt");
	} elseif ($mode == 'reviews') {
		foreach (glob("books/$title/review*.txt") as $filename) {
			$myfile = fopen("$filename", "r");
			$review = "<h3>" . trim(preg_replace('/\s+/', ' ', fgets($myfile))) . " <span>" . fgets($myfile) . "</span>" . "<h3>";
			$review .= "<p>";
			while (($line = fgets($myfile)) !== false) {
		        $review .= $line;
		    }
		    $review .= "</p>";
		    print $review;
		}
	} elseif ($mode == 'books') {
		$xmldoc = new DOMDocument(); 
		$books_tag = $xmldoc->createElement("books");
		$xmldoc->appendChild($books_tag);
		foreach (glob("books/*") as $book) {
			$book_tag = $xmldoc->createElement("book");

			$folderTitle = substr($book, 6);

			$myfile = fopen("books/$folderTitle/info.txt", "r");
			$bookTitle = trim(preg_replace('/\s+/', ' ', fgets($myfile)));

			$title_tag = $xmldoc->createElement("title", $bookTitle);
			$book_tag->appendChild($title_tag);

			$folder_tag = $xmldoc->createElement("folder", $folderTitle);
			$book_tag->appendChild($folder_tag);

			$books_tag->appendChild($book_tag);
		}
		header("Content-type: text/xml");
		print $xmldoc->saveXML();
	}
?>