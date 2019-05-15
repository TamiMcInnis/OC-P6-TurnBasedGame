
// PLAYER OBJECTS
var chipmunk = {
	playerType: "chipmunk",
	playerImage: "<img src='images/chipmunk_face.png' class='chipmunk' id='chipmunk' alt='Chip player piece'>",
	playerPos: {
		col: 0,
		row: 0
	},
	playerHealth: 100,
	playerWeapon: {
		weaponImage: "<img src='images/mushroom.png' id='mushroom' class='weapon' data-damage='10' alt='Mushroom'>",
		weaponDamage: 10,
		oldWeapon: ""
	},
	playerShield: false,
}

var raccoon = {
	playerType: "raccoon",
	playerImage: "<img src='images/raccoon_face.png' class='raccoon' id='raccoon' alt='Rocky player piece'>",
	playerPos: {
		col: 0,
		row: 0
	},
	playerWeapon: {
		weaponImage: "<img src='images/mushroom.png' id='mushroom' class='weapon' data-damage='10' alt='Mushroom'>",
		weaponDamage: 10,
		oldWeapon: ""
	},
	playerHealth: 100,
	playerShield: false,
}

// WEAPONS
var acorn = "<img src='images/acorn.png' id='acorn' class='weapon' data-damage='20' alt='Acorn'>";
var apple = "<img src='images/apple.png' id='apple' class='weapon' data-damage='25' alt='Apple'>";
var mushroom = "<img src='images/mushroom.png' id='mushroom' class='weapon' data-damage='10' alt='Mushroom'>";
var pinecone = "<img src='images/pinecone.png' id='pinecone' class='weapon' data-damage='15' alt='Pinecone'>";

// STUMPS
var stump = "<img src='images/stump.png' class='stump' alt='Tree stump'>";

// GRID SQUARE ARRAY
var gridSquares = $('.grid-container > div').toArray();

// CURRENT PLAYER (STARTS AS CHIPMUNK)
var currentPlayer = chipmunk.playerType;

// FUNC TO RANDOMLY SELECT GRID SQUARE AND FILL WITH STUMP
function placeStump() {
	var randomSquare = gridSquares[Math.floor(Math.random() * gridSquares.length)];
	// IF CHOSEN SQUARE IS NOT FULL OR DIAGONAL TO ANOTHER STUMP
	if ( !(randomSquare.classList.contains("full")) && 
		!($("[data-row=" + (Number(randomSquare.dataset.row) - 1) + "][data-col=" + (Number(randomSquare.dataset.col) + 1) + "]")).hasClass("full") &&
		!($("[data-row=" + (Number(randomSquare.dataset.row) - 1) + "][data-col=" + (Number(randomSquare.dataset.col) - 1) + "]")).hasClass("full") &&
		!($("[data-row=" + (Number(randomSquare.dataset.row) + 1) + "][data-col=" + (Number(randomSquare.dataset.col) + 1) + "]")).hasClass("full") &&
		!($("[data-row=" + (Number(randomSquare.dataset.row) + 1) + "][data-col=" + (Number(randomSquare.dataset.col) - 1) + "]")).hasClass("full")) {
			// FILL SQUARE WITH STUMP AND GIVE IT CLASS OF "FULL"
			randomSquare.innerHTML = stump;
			randomSquare.classList.add("full");
	} else {
		// OTHERWISE RERUN FUNCTION
		placeStump();
	}
}

// FUNC TO RANDOMLY SELECT GRID SQUARE AND FILL WITH WEAPON
function placeWeapon(weapon) {
	var randomSquare = gridSquares[Math.floor(Math.random() * gridSquares.length)];
	// IF CHOSEN SQUARE IS NOT FULL
	if (!(randomSquare.classList.contains("full"))) {
		// FILL SQUARE WITH WEAPON AND GIVE IT CLASS OF "FULL"
		randomSquare.innerHTML = weapon;
		randomSquare.classList.add("full");
	} else {
		// OTHERWISE RERUN FUNCTION
		placeWeapon(weapon);
	}
}

// FUNC TO RANDOMLY SELECT GRID SQUARE AND FILL WITH PLAYER
function placePlayer(player) {
	var randomSquare = gridSquares[Math.floor(Math.random() * gridSquares.length)];
	// IF CHOSEN SQUARE IS NOT FULL
	if (player == chipmunk) {
		if (!(randomSquare.classList.contains("full"))) {
			// PLACE CHIPMUNK AND GIVE IT CLASS OF "FULL"
			randomSquare.innerHTML = player.playerImage;
			randomSquare.classList.add("full");
			// ASSIGN CURRENT POS TO PLAYER OBJECT
			chipmunk.playerPos.col = randomSquare.dataset.col;
			chipmunk.playerPos.row = randomSquare.dataset.row;
		} else {
			// OTHERWISE RERUN FUNCTION
			placePlayer(player);
		}
	} else {
		// IF CHOSEN SQUARE IS NOT IN SAME COLUMN OR ROW AS CHIPMUNK
		var c = randomSquare.dataset.col - chipmunk.playerPos.col;
		var r = randomSquare.dataset.row - chipmunk.playerPos.row;
		if ((c > 1 || c < -1) && (r > 1 || r < -1)) {
			// AND IF CHOSEN SQUARE IS NOT FULL
			if (!(randomSquare.classList.contains("full"))) {
				// PLACE RACCOON AND GIVE IT CLASS OF "FULL"
				randomSquare.innerHTML = player.playerImage;
				randomSquare.classList.add("full");
				// ASSIGN CURRENT POS TO PLAYER OBJECT
				raccoon.playerPos.col = randomSquare.dataset.col;
				raccoon.playerPos.row = randomSquare.dataset.row;
			} else {
				// OTHERWISE RERUN FUNCTION (IF FULL)
				placePlayer(player);
			}
		} else {
			// OTHERWISE RERUN FUNCTION (IF NEAR CHIPMUNK)
			placePlayer(player);
		}
	}
}

// FUNTCION TO SHOW POSSIBLE PLAYER MOVES
var playerMovement = {
	north: function (player) { 
		// CREATE VAR FOR 3 SQUARES NORTH OF PLAYER
		var north_1 = Number(player.playerPos.row) - 1; 
		var north_2 = Number(player.playerPos.row) - 2;
		var north_3 = Number(player.playerPos.row) - 3;
		// IF CLOSEST SQUARE IS NOT FULL, HIGHLIGHT IT AND PROCEED TO NEXT SQUARE
		if (!($("[data-row=" + north_1 + "][data-col=" + player.playerPos.col + "]").hasClass("full"))) {
			$("[data-row=" + north_1 + "][data-col=" + player.playerPos.col + "]").addClass("highlight");
			if (!($("[data-row=" + north_2 + "][data-col=" + player.playerPos.col + "]").hasClass("full"))) {
				$("[data-row=" + north_2 + "][data-col=" + player.playerPos.col + "]").addClass("highlight");
				if (!($("[data-row=" + north_3 + "][data-col=" + player.playerPos.col + "]").hasClass("full"))) {
					$("[data-row=" + north_3 + "][data-col=" + player.playerPos.col + "]").addClass("highlight");
				}
			}
		}		
	},
	south: function (player) { 
		// CREATE VAR FOR 3 SQUARES SOUTH OF PLAYER		
		var south_1 = Number(player.playerPos.row) + 1; 
		var south_2 = Number(player.playerPos.row) + 2;
		var south_3 = Number(player.playerPos.row) + 3;
		// IF CLOSEST SQUARE IS NOT FULL, HIGHLIGHT IT AND PROCEED TO NEXT SQUARE
		if (!($("[data-row=" + south_1 + "][data-col=" + player.playerPos.col + "]").hasClass("full"))) {
			$("[data-row=" + south_1 + "][data-col=" + player.playerPos.col + "]").addClass("highlight");
			if (!($("[data-row=" + south_2 + "][data-col=" + player.playerPos.col + "]").hasClass("full"))) {
				$("[data-row=" + south_2 + "][data-col=" + player.playerPos.col + "]").addClass("highlight")
				if (!($("[data-row=" + south_3 + "][data-col=" + player.playerPos.col + "]").hasClass("full"))) {
					$("[data-row=" + south_3 + "][data-col=" + player.playerPos.col + "]").addClass("highlight");
				}
			}
		}	
	},
	east: function (player) { 
		// CREATE VAR FOR 3 SQUARES EAST OF PLAYER
		var east_1 = Number(player.playerPos.col) + 1; 
		var east_2 = Number(player.playerPos.col) + 2;
		var east_3 = Number(player.playerPos.col) + 3;
		// IF CLOSEST SQUARE IS NOT FULL, HIGHLIGHT IT AND PROCEED TO NEXT SQUARE
		if (!($("[data-col=" + east_1 + "][data-row=" + player.playerPos.row + "]").hasClass("full"))) {
			$("[data-col=" + east_1 + "][data-row=" + player.playerPos.row + "]").addClass("highlight");
			if (!($("[data-col=" + east_2 + "][data-row=" + player.playerPos.row + "]").hasClass("full"))) {
				$("[data-col=" + east_2 + "][data-row=" + player.playerPos.row + "]").addClass("highlight");
				if (!($("[data-col=" + east_3 + "][data-row=" + player.playerPos.row + "]").hasClass("full"))) {
					$("[data-col=" + east_3 + "][data-row=" + player.playerPos.row + "]").addClass("highlight");
				}
			}
		}	
	},
	west: function (player) { 
		// CREATE VAR FOR 3 SQUARES WEST OF PLAYER
		var west_1 = Number(player.playerPos.col) - 1; 
		var west_2 = Number(player.playerPos.col) - 2;
		var west_3 = Number(player.playerPos.col) - 3;
		// IF CLOSEST SQUARE IS NOT FULL, HIGHLIGHT IT AND PROCEED TO NEXT SQUARE
		if (!($("[data-col=" + west_1 + "][data-row=" + player.playerPos.row + "]").hasClass("full"))) {
			$("[data-col=" + west_1 + "][data-row=" + player.playerPos.row + "]").addClass("highlight");
			if (!($("[data-col=" + west_2 + "][data-row=" + player.playerPos.row + "]").hasClass("full"))) {
				$("[data-col=" + west_2 + "][data-row=" + player.playerPos.row + "]").addClass("highlight");
				if (!($("[data-col=" + west_3 + "][data-row=" + player.playerPos.row + "]").hasClass("full"))) {
					$("[data-col=" + west_3 + "][data-row=" + player.playerPos.row + "]").addClass("highlight");
				}
			}
		}	
	},
	// ON CHIPMUNK MOUSE OVER, HIGHLIGHT FUNCTION RUNS FOR CHIPMUNK
	showMovesChipmunk: function () {
		playerMovement.north(chipmunk);
		playerMovement.south(chipmunk);
		playerMovement.east(chipmunk);
		playerMovement.west(chipmunk);
		// ENABLE HIGHLIGHTED SQUARES TO BE CLICKED
		$(".highlight").on("click", function() {
    		playerMovement.movePlayer.call(this, chipmunk);
		});
	},
	// ON RACCOON IS MOUSE OVER, HIGHTLIGHT FUNCTION RUNS FOR RACCOON
	showMovesRaccoon: function () {	
		playerMovement.north(raccoon);
		playerMovement.south(raccoon);
		playerMovement.east(raccoon);
		playerMovement.west(raccoon);
		// ENABLE HIGHLIGHTED SQSUARES TO BE CLICKED
		$(".highlight").on("click", function() {
    		playerMovement.movePlayer.call(this, raccoon);
		});
	},
	// ON HIGHLIGHT CLICK, MOVE PLAYER/UPDATE WEAPON
	movePlayer: function (player) {
		if ($(this).hasClass("highlight")) {
			// REMOVE OLD PLAYER IMAGE AND LEAVE OLD WEAPON IN PREVIOUS SQUARE
			if (player == chipmunk) {
				$("img#chipmunk").parent().append(player.playerWeapon.oldWeapon);
				player.playerWeapon.oldWeapon = "";
				$("img#chipmunk").remove();
			} else {
				$("img#raccoon").parent().append(player.playerWeapon.oldWeapon);
				player.playerWeapon.oldWeapon = "";
				$("img#raccoon").remove();
			}
			$("[data-col=" + player.playerPos.col + "][data-row=" + player.playerPos.row + "]").removeClass("full");
			// PLACE PLAYER IMAGE IN NEW LOCATION + UPDATE CLASS OF "FULL"
			$(this).prepend(player.playerImage);
			$(this).addClass("full");
			// IF WEAPON IN GRID, SWAP WEAPONS AND UPDATE PLAYER PANEL
			if ($(this).children().is("img.weapon")) {
				player.playerWeapon.oldWeapon = player.playerWeapon.weaponImage;
				player.playerWeapon.weaponImage = $(this).children(".weapon").prop("outerHTML");
				$("#" + player.playerType + "WeaponPanel").children("img").remove();
				$("#" + player.playerType + "WeaponPanel").prepend(player.playerWeapon.weaponImage);
				inputUpdate($("#" + player.playerType + "AttackInput"));
				$("#" + player.playerType + "AttackInput").html($(this).children(".weapon").attr("data-damage"));
				player.playerWeapon.weaponDamage = Number($(this).children(".weapon").attr("data-damage"));
				$(this).children(".weapon").remove();
			}
			// UPDATE PLAYER POSITION
			player.playerPos.col = this.dataset.col;
			player.playerPos.row = this.dataset.row;
			// REMOVE HIGHLIGHT CLASS, DISABLING "CLICK" LISTENER
			$(".grid-item").removeClass("highlight");
			$(".grid-item").off("click");
			// MOVE ON TO DETECT BATTLE FUNCTION
			setTimeout (gameTurn.detectBattle, 500);
		}
	}
}

var gameTurn = {
	// START TURN BY ENABLING LISTENER FOR PLAYER MOVEMENT OBJECT FOR CURRENT PLAYER
	detectTurn: function () {
		// REMOVE CURRENT PLAYER PANEL HIGHLIGHT
		$(".player-board").removeClass("activePlayer");
		// IF NEW CURRENT PLAYER IS CHIPMUNK
		if (currentPlayer == "chipmunk") {
			$("#player-board-1").addClass("activePlayer");
			$("#chipmunk").mouseenter(playerMovement.showMovesChipmunk);
		// IF NEW CURRENT PLAYER IS RACCOON 
		} else if (currentPlayer == "raccoon") {
			$("#player-board-2").addClass("activePlayer");
	 		$("#raccoon").mouseenter(playerMovement.showMovesRaccoon);
	 	}
	 },
	 // DETERMINE IF THERE WILL BE A BATTLE
 	detectBattle: function() {
		var columnDif = chipmunk.playerPos.col - raccoon.playerPos.col;
		var rowDif = chipmunk.playerPos.row - raccoon.playerPos.row;
		 // IF AFTER MOVEMENT PLAYERS ARE TOUCHING, ENTER BATTLE
		if (((chipmunk.playerPos.col == raccoon.playerPos.col) && (rowDif == -1 || rowDif == +1)) || ((chipmunk.playerPos.row == raccoon.playerPos.row) && (columnDif == -1 || columnDif == +1))) {
			// ON CHIPMUNK TURN
			if (currentPlayer == "chipmunk") {
				// IF RACCOON HAS NO SHIELD
				if (raccoon.playerShield === false) {
					raccoon.playerHealth = raccoon.playerHealth - chipmunk.playerWeapon.weaponDamage;
					inputUpdate($("#raccoonHealthInput"));
					$("#raccoonHealthInput").html(raccoon.playerHealth);
					changeProfilePic(raccoon);
					// CHECK FOR PLAYER DEFEAT BEFORE RETALIATION
					if (raccoon.playerHealth <= 0) {
						setTimeout(gameOver, 500);
					} else {
						// RETALIATION
						chipmunk.playerHealth = chipmunk.playerHealth - raccoon.playerWeapon.weaponDamage;
						inputUpdate($("#chipmunkHealthInput"));
						$("#chipmunkHealthInput").html(chipmunk.playerHealth);
						changeProfilePic(chipmunk);
					}
				// IF RACCOON HAS SHIELD
				} else if (raccoon.playerShield === true) {
					raccoon.playerHealth = raccoon.playerHealth - chipmunk.playerWeapon.weaponDamage / 2;
					inputUpdate($("#raccoonHealthInput"));
					$("#raccoonHealthInput").html(raccoon.playerHealth);
					changeProfilePic(raccoon);
				}
			// ON RACCOON TURN
			} else if (currentPlayer == "raccoon") {
				// IF CHIPMUNK HAS NO SHIELD
				if (chipmunk.playerShield === false) {
					chipmunk.playerHealth = chipmunk.playerHealth - raccoon.playerWeapon.weaponDamage;
					inputUpdate($("#chipmunkHealthInput"));
					$("#chipmunkHealthInput").html(chipmunk.playerHealth);
					changeProfilePic(chipmunk);
					// CHECK FOR PLAYER DEFEAT BEFORE RETALIATION
					if (chipmunk.playerHealth <= 0) {
						setTimeout(gameOver, 500);
					} else {
					// RETALIATE
					inputUpdate($("#raccoonHealthInput"));
					raccoon.playerHealth = raccoon.playerHealth - chipmunk.playerWeapon.weaponDamage;
					$("#raccoonHealthInput").html(raccoon.playerHealth);
					changeProfilePic(raccoon);
				}
				// IF CHIPMUNK HAS SHIELD
				} else if (chipmunk.playerShield === true) {
					chipmunk.playerHealth = chipmunk.playerHealth - raccoon.playerWeapon.weaponDamage / 2;
					inputUpdate($("#chipmunkHealthInput"));
					$("#chipmunkHealthInput").html(chipmunk.playerHealth);
					changeProfilePic(chipmunk);
				}
			}
			// CHECK FOR PLAYER DEFEAT
			if (chipmunk.playerHealth <= 0 || raccoon.playerHealth <= 0) {
				setTimeout(gameOver, 500);
			} else {
				// IF NO PLAYER DEFEATED PROCEED TO SHIELD FUNCTION
				setTimeout(gameTurn.shieldStatus, 700);
			}
		} else {
		// IF NOT TOUCHING OPPONENT PROCEED TO SHIELD FUNCTION
		setTimeout(gameTurn.shieldStatus, 700);
		}
	},
	// ASK PLAYER IF THEY WANT TO ENABLE SHIELD
	shieldStatus: function() {
		$("#shieldModal").css("display", "block");
		$(".shieldButton").on("click", function() {
			// IF PLAYER CHOOSES SHIELD UP, UPADTE PLAYER OBJECT AND PANEL
			if ($(this).attr("id") === "shieldUp") {
				if (currentPlayer == "chipmunk") {
					chipmunk.playerShield = true;
					inputUpdate($("#chipmunkShieldInput"));
					$("#chipmunkShieldInput").html("UP");
				} else if (currentPlayer == "raccoon") {
					raccoon.playerShield = true;
					inputUpdate($("#raccoonShieldInput"));
					$("#raccoonShieldInput").html("UP");
				}
			// IF PLAYER CHOOSES SHIELD DOWN, UPADTE PLAYER OBJECT AND PANEL
			} else if ($(this).attr("id") === "shieldDown") {
				if (currentPlayer == "chipmunk") {
					chipmunk.playerShield = false;
					inputUpdate($("#chipmunkShieldInput"));
					$("#chipmunkShieldInput").html("DOWN");
				} else if (currentPlayer == "raccoon") {
					raccoon.playerShield = false;
					inputUpdate($("#raccoonShieldInput"));
					$("#raccoonShieldInput").html("DOWN");
				}
			}
			// DISABLE CLICK LISTENER FOR SHIELD AND HIDE MODAL
			$(".shieldButton").off();
			$("#shieldModal").css("display", "none");
			// PROCEED TO CHANGE TURN FUNCTION
			setTimeout(gameTurn.changeTurn, 500);
			
		});
	},
	// CHANGE CURRENT PLAYER VARIABLE
	changeTurn: function() {
		switch (true) {
			case currentPlayer == "chipmunk":
				currentPlayer = "raccoon";
				break;
			case currentPlayer == "raccoon":
				currentPlayer = "chipmunk";
				break;
		}
		// PROCEED TO START OF TURN CYCLE AGAIN
		setTimeout(gameTurn.detectTurn, 500);
	}
}

// GAME OVER FUNCTION
function gameOver() {
	var winner;
	if (chipmunk.playerHealth <= 0) {
		winner = raccoon.playerType;
	} else if (raccoon.playerHealth <= 0) {
		winner = chipmunk.playerType;
	}
	$("#winner").html(winner);
	$("#gameOverModal").css("display", "block");
}

// METHODS TO SET UP NEW GAME BOARD
var setup = {
	// RESET BOARD
	reset: function() {
		$(".grid-item").removeClass("full highlight");
		$(".grid-item").empty();
		$("#gameOverModal").css("display", "none");
		currentPlayer = chipmunk.playerType;
		// RESET CHIPMUNK
		chipmunk.playerImage = "<img src='images/chipmunk_face.png' class='chipmunk' id='chipmunk' alt='Chip player piece'>";
		chipmunk.playerHealth = 100;
		chipmunk.playerWeapon.weaponImage = "<img src='images/mushroom.png' id='mushroom' class='weapon' data-damage='10' alt='Mushroom'>";
		chipmunk.playerWeapon.weaponDamage = 10;
		chipmunk.playerWeapon.oldWeapon = "";
		chipmunk.playerShield = false;
		$("#chipmunkProfile").children("img").replaceWith("<img src='images/chipmunk_100.png' id='profilePic_chipmunk' alt='Chip at 100 health'>");
		$("#chipmunkHealthInput").html("100");
		$("#chipmunkWeaponPanel").children("img").replaceWith("<img src='images/mushroom.png' id='mushroom' class='weapon' data-damage='10' alt='Mushroom'>");
		$("#chipmunkAttackInput").html("10");
		$("#chipmunkShieldInput").html("DOWN");
		// RESET RACCOON
		raccoon.playerImage = "<img src='images/raccoon_face.png' class='raccoon' id='raccoon' alt='Raccoon player piece'>";
		raccoon.playerHealth = 100;
		raccoon.playerWeapon.weaponImage = "<img src='images/mushroom.png' id='mushroom' class='weapon' data-damage='10' alt='Mushroom'>";
		raccoon.playerWeapon.weaponDamage = 10;
		raccoon.playerWeapon.oldWeapon = "";
		raccoon.playerShield = false;
		$("#raccoonProfile").children("img").replaceWith("<img src='images/raccoon_100.png' id='profilePic_raccoon' alt='Rocky at 100 health'>");
		$("#raccoonHealthInput").html("100");
		$("#raccoonWeaponPanel").children("img").replaceWith("<img src='images/mushroom.png' id='mushroom' class='weapon' data-damage='10' alt='Mushroom'>");
		$("#raccoonAttackInput").html("10");
		$("#raccoonShieldInput").html("DOWN");
 	},
	// PLACE STUMPS
	stumps: function() {
		for (var i = 0; i < 14; i++) {
			placeStump();
		}
	},
	// PLACE WEAPONS
	weapons: function() {
		placeWeapon(acorn);
		placeWeapon(apple);
		placeWeapon(pinecone);
		$("img.weapon").parent().removeClass("full");
	},
	// PLACE PLAYERS
	players: function() { 
		placePlayer(chipmunk);
		placePlayer(raccoon);
	}
}

// DISPLAY AND HIDE RULES WITH BUTTON CLICK
$("#rulesButton").on("click", function() {
	$("#rulesModal").css("display", "block");
});

$("#rulesClose").on("click", function() {
	$("#rulesModal").css("display", "none");
});

// HIDE GAME OVER MESSAGE WITH BUTTON CLICK
$("#gameOverClose").on("click", function() {
	$("#gameOverModal").css("display", "none");
});

// CHANGE PROFILE PHOTO ON HEALTH CHANGE
function changeProfilePic(player) {
	switch (true) {
		case ((player.playerHealth <= 60) && (player.playerHealth > 30)):
			$("#profilePic_" + player.playerType).attr("src", "images/" + player.playerType + "_60.png");
			break;
		case ((player.playerHealth <= 30) && (player.playerHealth > 0)):
			$("#profilePic_" + player.playerType).attr("src", "images/" + player.playerType + "_30.png");
			break;
		case (player.playerHealth <= 0):
			$("#profilePic_" + player.playerType).attr("src", "images/" + player.playerType + "_0.png");
			break;
	}
}

// FLASH COLOUR ON INPUT FIELD UPON CHANGE OF CONTENT
function inputUpdate(updateItem) {
	updateItem.addClass("inputChange");
	setTimeout(function() {
		updateItem.removeClass("inputChange");
	}, 1500);
}

// START NEW GAME W BUTTON CLICK - LOADS SETUP METHODS AND FIRST TURN
$(window).on("load", function() {
	document.getElementById("newGameButton").addEventListener("click", function() {
		setup.reset();
		setup.stumps();
		setup.players();
		setup.weapons();
		gameTurn.detectTurn();
	});
});

