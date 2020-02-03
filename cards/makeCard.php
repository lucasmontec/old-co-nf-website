<?php
	//Report all errors
	error_reporting(E_ALL);
	
	//Useful
	function getIP() { 
		$ip; 
		if (getenv("HTTP_CLIENT_IP")) 
		$ip = getenv("HTTP_CLIENT_IP"); 
		else if(getenv("HTTP_X_FORWARDED_FOR")) 
		$ip = getenv("HTTP_X_FORWARDED_FOR"); 
		else if(getenv("REMOTE_ADDR")) 
		$ip = getenv("REMOTE_ADDR"); 
		else 
		$ip = "UNKNOWN";
		return $ip; 
	}

	// Create connection to the card database
	$con=mysqli_connect("fdb5.biz.nf","1495754_zumbi","3815ppbiz","1495754_zumbi");
	// Check connection
	if (mysqli_connect_errno())
	{
		echo "MySQL has failed! Error: " . mysqli_connect_error();
	}
		
	// define variables and set to empty values
	$content = $title = "";

	if ($_SERVER["REQUEST_METHOD"] == "POST")
	{
	  $title = test_input($_POST["title"]);
	  $content = test_input($_POST["content"]);
	}

	function test_input($data)
	{
	  $data = trim($data);
	  $data = stripslashes($data);
	  $data = htmlspecialchars($data);
	  return $data;
	}
	
	//Make the query
	$sql = "INSERT INTO `card`(`title`, `content`, `timeCreated`, `active`, `owner`, `lifeTime`) VALUES (\"" . $title . "\",\"" . $content  . "\"," . time() . ", 1,\"" . getIP()  . "\", 60);";
	
	//Show the result
	/*echo "<script type='text/javascript'>alert(\"" . $sql . "\");</script>";*/
	
	//Make the card
	if (!mysqli_query($con,$sql)){
		die('Error: ' . mysqli_error($con));
	}
	
	//Close the connection
	mysqli_close($con);
	
	//Leave
	header( 'Location: showCards.php' ) ;
?>