//Get all divs
var getDivsWithPartialID = function(prefix){
	var ret = new Array();
	var divTags = document.getElementsByTagName('div');
    var count = 0;
    for(var i=0;i<divTags.length;i++){
        if(divTags[i].id.indexOf(prefix) != -1){
            ret[count++] = divTags[i];
        }
    }
	return ret;
}
var indexOf = function(needle) {
    if(typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                if(this[i] === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle);
};

//Prepare the AJAX request to sample the server for card times
var requestTime = function(){
	//Make the XHR object
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	//Create the callback
	xmlhttp.onreadystatechange=function(){
		//Store all active ID's from the active cards
		var activeIDs = new Array();
		var activeCount = 0;
		//If the request was successful process data
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			//Tell console
			//console.log("Response received!");
			//Find all active cards by listing tags
			var elems = xmlhttp.responseXML.documentElement.getElementsByTagName("CARDTIME");
			//console.log("Elements: "+elems.length);
			//Iterate through results
			for (i=0;i<elems.length;i++){
			
				//Get the ID entity 
				entity = elems[i].getElementsByTagName("ID");
				//Store the card id
				var id = 0
				try{
					id =  entity[0].firstChild.nodeValue;
					//Store the active id
					//console.log("active id add: "+id);
					activeIDs[activeCount++] = "thought_card_"+id;
				}
				catch (er){
					id = -1;
				}
				
				//Get the TIME entity 
				entity = elems[i].getElementsByTagName("TIME");
				//Store the card time
				var time = ""
				try{
					time =  entity[0].firstChild.nodeValue;
				}
				catch (er){
					time = "00:-1";
				}
				
				//Get the each card timer div
				document.getElementById(id+"_timer").innerHTML = time;
			}
			
			//Remove dead cards
			var cards = getDivsWithPartialID("thought_card_");
			for (i=0;i<cards.length;i++){
				//console.log("Card ID: "+cards[i].id+" id is contained? ("+(indexOf.call(activeIDs, cards[i].id) > -1)+")" );
				if(indexOf.call(activeIDs, cards[i].id) == -1){
					cards[i].parentNode.removeChild(cards[i]);
				}
			}
		}
	}
	
	//Send the request
	xmlhttp.open("GET","cardTimes.php",true);
	xmlhttp.send();
}

//Add a function to register the local timers for the page
window.onload=function(){
	//Call a first request
	requestTime();
	//Create the ajax interval
	setInterval(requestTime,1000);
	
	//Globals
	var newcard = document.getElementById('newcard');
	var createCard = false;
	
	//Page functionality - New card button
	newcard.style.cursor = 'pointer';
	newcard.onclick = function() {
		if(!createCard){
			document.getElementById('bgblock').style.display = "block";
			document.getElementById('form_newcard').style.display = "block";
			document.getElementById('blurme').setAttribute("style","-webkit-filter: blur(2px);")
			createCard = true;
		}else{
			document.getElementById('bgblock').style.display = "none";
			document.getElementById('form_newcard').style.display = "none";
			document.getElementById('blurme').setAttribute("style","-webkit-filter: blur(0px);")
			createCard = false;
		}
	};
};

//Create a method for the JS button on each card
var changeTime = function(id, val){
	//Make the XHR object
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.open("GET","updateCard.php?id="+id+"&val="+val,true);
	xmlhttp.send();
}

//Create other methods
var addTime = function(id){
	changeTime(id,30);
}
var removeTime = function(id){
	changeTime(id,-30);
}
