<!doctype html>
<html>

	<head>
		<!-- Tab title -->
		<title>Though cards</title>
		<!-- Loads -->
		<link href='http://fonts.googleapis.com/css?family=Love+Ya+Like+A+Sister' rel='stylesheet' type='text/css'>
	</head>

	<body>
		<!-- Top bar -->
		<div id="top">
			<img src="https://dl.dropboxusercontent.com/u/1466740/www-test/css_title.png">
		</div>
			
		<!-- Content -->
		<!-- This div organizes the cards in lists -->
		<div id="card_area">

			<!-- Cards -->
			<?php
				// Create connection to the card database
				$con=mysqli_connect("sql206.byethost13.com","b13_14279963","3815ppbyet","b13_14279963_cards");
				// Check connection
				if (mysqli_connect_errno())
				{
					echo "MySQL has failed! Error: " . mysqli_connect_error();
				}
				
				//Select the cards
				$result = mysqli_query($con,"SELECT * FROM card WHERE active = 0 LIMIT 10;");
				
				//Create the card for each result
				while($row = mysqli_fetch_array($result))
				{
					//Calculate card time
					$time = time() - $row['timeCreated'];
					
					//Begin card div
					echo "<div class=\"thought_card\">";
					
					//Title div
					echo "<div class=\"title\">";
					echo $row['title'] . " " . $row['title'];
					echo "</div>";
					
					//Content div
					echo "<div class=\"content\"> <p>";
					echo $row['content'];
					echo "</p></div>";
					
					//Buttons div
					echo "<div class=\"buttons\"><button type=\"button\">keep</button> <button type=\"button\">kill</button></div>";
					
					//End of the card div
					echo "</div>";
				}
				
				//Close the connection
				mysqli_close($con);
			?>

		</div>
	</body>
	
</html>