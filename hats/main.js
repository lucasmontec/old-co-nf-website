var startingMoney = 50;
var players = {
	player1 : startingMoney,
	player2 : startingMoney,
	player3 : startingMoney,
	player4 : startingMoney
};

var loanAmount = 50;
var selectedPlayer = 1;

var plusBonus = 1.5;
var sellModifier = 0.75;

var resourceMinValue = 1;
var resourceMaxValue = 100;
var resourceBuySellChange = 5;

var resourcePrices = {
	water : 10,
	wood : 10,
	iron : 15,
	coal : 20
};

function loan(pl){
	players["player"+pl] += loanAmount;
}

function payLoan(pl){
	if(players["player"+pl] - loanAmount > 0)
		players["player"+pl] -= loanAmount;
}

function contains(str, part) {
	return str.indexOf(part) > -1;
}

function changeResourceValue(res, chg){
	if((chg < 0 && resourcePrices[res]+chg > resourceMinValue) || (chg > 0 && resourcePrices[res]+chg < resourceMaxValue))
		resourcePrices[res] += chg;
}

function buyResource(res, plus) {
	var pp = ( plus ? plusBonus : 1);
	var price = resourcePrices[res] * pp;
	var player = "player" + selectedPlayer;

	$('.p1-meter').removeClass("low");
	$('.p2-meter').removeClass("low");
	$('.p3-meter').removeClass("low");
	$('.p4-meter').removeClass("low");

	if (players[player] > price) {//has money
		players[player] -= price;
		changeResourceValue(res,resourceBuySellChange);
		return;
	}

	//No money
	$(".p"+selectedPlayer+"-meter").addClass("low");
}

function sellResource(res, plus) {
	var pp = ( plus ? plusBonus : 1);
	var price = resourcePrices[res] * pp;
	var player = "player" + selectedPlayer;

	players[player] += price*sellModifier;
	changeResourceValue(res,-resourceBuySellChange);
}

function moneyToString(money){
	var val = "R$ "+money;
	if(contains(val, "."))
		val = val.replace(".",",");
	else
		val += ",0";
	val += "0";
	return val;
}

function updateResourcePrices(){
	$("[id$='price']").each(function(index){
			var resource = this.id.substring(0,this.id.indexOf("-"));
			var price = resourcePrices[resource];
			var bonus = 1;
			if(contains(this.id, "plus")){
				bonus = plusBonus;
			}
			$(this).text(moneyToString(price*bonus));
		}
	);
}

function updateMoneyMeters() {
	$('.p1-meter').text(moneyToString(players.player1));
	$('.p2-meter').text(moneyToString(players.player2));
	$('.p3-meter').text(moneyToString(players.player3));
	$('.p4-meter').text(moneyToString(players.player4));
}

function install() {
	// $=  means selector 'ends with'
	$("[id$='loan']").on('click', function() {
		var btn = event.target.id;
		if (contains(btn, "p1")) {
			loan(1);
		}
		if (contains(btn, "p2")) {
			loan(2);
		}
		if (contains(btn, "p3")) {
			loan(3);
		}
		if (contains(btn, "p4")) {
			loan(4);
		}
		updateMoneyMeters();
	});

	$("[id$='pay']").on('click', function() {
		var btn = event.target.id;
		if (contains(btn, "p1")) {
			payLoan(1);
		}
		if (contains(btn, "p2")) {
			payLoan(2);
		}
		if (contains(btn, "p3")) {
			payLoan(3);
		}
		if (contains(btn, "p4")) {
			payLoan(4);
		}
		updateMoneyMeters();
	});

	$("[id$='selector']").on('click', function() {
		$("[id$='selector']").removeClass("player-box-selected");
		$(this).addClass("player-box-selected");

		var btn = this.id;
		if (btn.indexOf("p1") > -1) {
			selectedPlayer = 1;
		}
		if (btn.indexOf("p2") > -1) {
			selectedPlayer = 2;
		}
		if (btn.indexOf("p3") > -1) {
			selectedPlayer = 3;
		}
		if (btn.indexOf("p4") > -1) {
			selectedPlayer = 4;
		}
		
		$('.p1-meter').removeClass("low");
		$('.p2-meter').removeClass("low");
		$('.p3-meter').removeClass("low");
		$('.p4-meter').removeClass("low");
	});
}

function installShop() {
	$("[id^='buy']").on('click', function() {

		var btn = event.target.id;
		var plus = contains(btn, "plus");
		if (contains(btn, "coal")) {
			buyResource("coal", plus);
		}
		if (contains(btn, "iron")) {
			buyResource("iron", plus);
		}
		if (contains(btn, "wood")) {
			buyResource("wood", plus);
		}
		if (contains(btn, "water")) {
			buyResource("water", plus);
		}
		updateMoneyMeters();
		updateResourcePrices();
	});
	
	$("[id^='sell']").on('click', function() {

		var btn = event.target.id;
		var plus = contains(btn, "plus");
		if (contains(btn, "coal")) {
			sellResource("coal", plus);
		}
		if (contains(btn, "iron")) {
			sellResource("iron", plus);
		}
		if (contains(btn, "wood")) {
			sellResource("wood", plus);
		}
		if (contains(btn, "water")) {
			sellResource("water", plus);
		}
		updateMoneyMeters();
		updateResourcePrices();
	});
}


$(document).ready(function() {
	install();
	installShop();
	updateResourcePrices();
	updateMoneyMeters();
});
