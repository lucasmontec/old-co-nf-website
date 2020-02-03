<!doctype html>
<html>

	<head>
		<!-- Tab title -->
		<title>Though cards</title>
		<!-- Loads -->
		<link href='showCardsStyle.css' rel='stylesheet' type='text/css' />
		<script src="timer.js"></script>
		<script src="googleFont.js"></script>
	</head>

	<body>
		<!-- This is to apply the body blur -->
		<div id="blurme">
			<!-- Top bar -->
			<div id="top">
				<img src="css_title.png">
			</div>
				
			<!-- Content -->
			<!-- This div organizes the cards in lists -->
			<div id="card_area">

				<!-- Cards -->
				<?php
					// Create connection to the card database
					$con=mysqli_connect("fdb5.biz.nf","1495754_zumbi","3815ppbiz","1495754_zumbi");
					// Check connection
					if (mysqli_connect_errno())
					{
						echo "MySQL has failed! Error: " . mysqli_connect_error();
					}
					
					//Select the cards
					$result = mysqli_query($con,"SELECT * FROM card WHERE active = 1 LIMIT 10;");
					
					//Create the card for each result
					while($row = mysqli_fetch_array($result))
					{
						//Calculate card time
						$time = time() - $row['timeCreated'];
						
						//Begin card div
						echo "<div class=\"thought_card\" id=\"thought_card_" . $row['timeCreated']  .  "\">";
						
						//Title div
						echo "<div class=\"title\">";
						echo $row['title'];
						echo "</div>";
						
						//Content div
						echo "<div class=\"content\"> <p>";
						echo $row['content'];
						echo "</p></div>";
						
						//Timer
						echo "<div class=\"timer\" id=\"" . $row['timeCreated'] . "_timer\" >";
						echo date("i:s",$time);
						echo "</div>";
						
						//Buttons div
						echo "<div class=\"buttons\"><button type=\"button\" onclick=\"addTime(" . $row['timeCreated'] . ")\">keep</button> <button type=\"button\" onclick=\"removeTime(" . $row['timeCreated'] . ")\">kill</button></div>";
						
						//End of the card div
						echo "</div>";
					}
					
					//Close the connection
					mysqli_close($con);
				?>

			</div>
		</div>
		
		<!-- The new card button -->
		<div id="newcard"></div>
		<!-- The div that makes the bg dark -->
		<div id="bgblock"></div>
		<!-- The new card form -->
		<div id="form_newcard" >
		<form action="makeCard.php" method="post" id="cardform">
			<input type="text" name="title" placeholder="Tile of the card" />
			<textarea placeholder="Idea, content, history, anything in your mind goes here!" maxlength="180" name="content" rows="5" cols="40" form="cardform"></textarea>
			<p>
				<input type="submit" />
			</p>
		</form>
	
	</body>
	
</html>