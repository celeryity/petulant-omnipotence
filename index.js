var letters = "";
var playerID = 0;
var gameID = 0;
var state = "";
var letterSelected;
var editingLetter = false;

$(document).ready(function() {
	poll("whoStarts", {playerID: playerID, gameID: gameID}, firstTwoLetters);
	
	$("#letter-container").on("click", ".letter-add", function() {
		if (editingLetter) {
			letterSelected.removeClass("letter-edit");
			letterSelected.addClass("letter-add");
			letterSelected.children("p").html("+");
			showGoButton(false);
		}
		
		editingLetter = true;
		letterSelected = $(this);
		$(this).removeClass("letter-add");
		$(this).addClass("letter-edit");
		letterSelected.children("p").html("??");
		showGoButton(false);
	});
	
	$("#letter-container").on("click", ".letter-edit", function() {
		editingLetter = false;
		$(this).removeClass("letter-edit");
		$(this).addClass("letter-add");
		letterSelected.children("p").html("+");
		letterSelected = null;
		showGoButton(false);
	});
	
	$("body").on("keypress", function(event) {
		var keyCode = event.which;
		
		if (keyCode == 8) {
				event.preventDefault();
		}
		
		var selectedLetter;
		if (editingLetter) {
			if (keyCode >= 97 && keyCode <= 122) {
				selectedLetter = String.fromCharCode(keyCode);
				letterSelected.html("<p>" + selectedLetter + "</p>");
				showGoButton(true);
			} else if (keyCode == 8) {
				selectedLetter = "&#8203;";
				letterSelected.html("<p>" + selectedLetter + "</p>");
				showGoButton(false);
			}
		}
	});
	
	var updateInterval = setInterval(function() {
	
	}, 1000);
	clearInterval(updateInterval);
});

function showGoButton(yes) {
	if (yes) {
		$("#footer").html("<div id=\"go-button\"><p>Go!</p></div>");
	} else {
		$("#footer").html("");
	}
}

function firstTwoLetters(data) {
	if (data == "true") {
		letters += "++";
		updateTiles();
	} else if (data == "false") {
	
	}
}

function updateTiles() {
	var i;
	
	var tileString = "";
	for (i = 0; i < letters.length; i++) {
		var letter = letters[i];
		if (letter == "+") {
			tileString += "<div class=\"letter letter-add\"><p>" + letter + "</p></div>";
		} else if (letter == "?") {
			tileString += "<div class=\"letter letter-unknown\"><p>" + letter + "</p></div>";
		} else {
			tileString += "<div class=\"letter letter-normal\"><p>" + letters[i] + "</p></div>";
		}
	}
	
	var totalLetters = letters.length;
	
	$("#letter-container").html(tileString);
	
	$("#letter-container").animate({
		width: 800 + 160 * (totalLetters - 1) / totalLetters
	}, 500);
	$("#letter-container").animate({
		height: 800 / totalLetters
	}, 500);
	$(".letter").animate({
		width: 800 / totalLetters
	}, 500);
	$(".letter").animate({
		height: 800 / totalLetters
	}, 500);
	$(".letter").animate({
		borderWidth: 40 / totalLetters
	}, 500);
	$(".letter").animate({
		borderRadius: 80 / totalLetters
	}, 500);
	$(".letter").animate({
		lineHeight: 720 / totalLetters
	}, 500);
	$(".letter").animate({
		fontSize: 400 / totalLetters
	}, 500);
	$(".letter:not(:first-child)").animate({
		marginLeft: 160 / totalLetters
	}, 500);
}

function poll(action, data, callback) {
	data.action = action;
	$.ajax({
		type: "POST",
		url: "poll.php",
		data: data,
		success: function(data, textStatus, jqXHR) {
			callback(data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert(textStatus);
		}
	});
}