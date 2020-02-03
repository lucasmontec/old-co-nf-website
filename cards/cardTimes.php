<?php
	header("Content-type: application/xml"); 
	
	// Create connection to the card database
	$con=mysqli_connect("fdb5.biz.nf","1495754_zumbi","3815ppbiz","1495754_zumbi");
	// Check connection
	if (mysqli_connect_errno())
	{
		echo "MySQL has failed! Error: " . mysqli_connect_error();
	}
	
	//Select the cards
	$result = mysqli_query($con,"SELECT * FROM card WHERE active = 1 LIMIT 10;");
	
	echo "<?xml version=\"1.0\" encoding=\"utf-8\" ?>";
	
	//Create the card for each result
	echo "<CARDS>";
	while($row = mysqli_fetch_array($result))
	{
		//Calculate card time
		$time = time() - $row['timeCreated'];
		$timeleft = $row['lifeTime'] - $time;
		
		//Check if the time is valid
		if ($timeleft > 0) {
		
			//Begin card
			echo "<CARDTIME>";
			echo "<ID>";
			echo $row['timeCreated'];
			echo "</ID>";
			echo "<TIME>";
			echo date("i:s",$timeleft);
			echo "</TIME>";
			//End card
			echo "</CARDTIME>";
			
		}else{
		
			//Invalidate card
			$sql = "UPDATE card SET active=0 WHERE timeCreated=" . $row['timeCreated'] . " ;";
			//Make the card
			if (!mysqli_query($con,$sql)){
				die('Error: ' . mysqli_error($con));
			}
			
		}
		
	}
	echo "</CARDS>";
	
	//Close the connection
	mysqli_close($con);
?>