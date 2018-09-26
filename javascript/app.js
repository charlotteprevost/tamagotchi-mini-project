console.log("JS IS RUNNING");


/*******************************************************************************************

User will:

• See Tamago move 
• See Tamago's mood shifts
• Interact with Tamago by clicking buttons

IF NO INTERACTION, TAMAGO DIES

*******************************************************************************************/




/******************************************************************************************

		MAKE TAMAGOTCHI CLASS
			In constructor:
				Name
				Hunger 			==> start at 1
				Sleepiness 		==> start at 1
				Boredom 		==> start at 1
				Age 			==> start at 1

				Methods: 
				feedTamago 		==> Alter Hunger
				sleepTamago 	==> Alter Sleepiness
				playTamago		==> Alter Boredom
				getsOlder 		==> Alter Age
		
******************************************************************************************/

class Tamagotchi {

	constructor(){
		this.name = "";
		this.hunger = 1;
		this.sleepiness = 1;
		this.boredom = 1;
		this.age = 1;
		this.alive = true;
		this.fed = false;
		this.slept = false;
		this.played = false;
	}


	isDead(){
		if (this.hunger > 10 || this.sleepiness > 10 || this.boredom > 10){
			console.log(this.name + " is dead...");
			this.alive = false;
			return true;
		}
	}

	feedTamago(){ 							// Called when user clicks on .food
		console.log("Omnomnom");		
		if (game.lightsOff === false){		// If light is on, you can feedTamago
			if (this.hunger <= 5) {
				this.hunger = 1;
			} else {
				this.hunger -= 5;
			}
			this.fed = true;
		}
		game.updateStats();
		game.tamagoReact();
	}

	sleepTamago(){						// Called when user clicks .light	
		// Have xeno close eyes and have zZzzZZZ
		console.log("zzzZZZZ");
		
		if (game.lightsOff === false){		// If light is on, you can sleepTamago and turn light off
			this.sleepiness = 1; 		// Reset sleep to zero 
			game.lightsOff = true;			// WHERE TO CHANGE BACKGROUND?
		} else {
			game.lightsOff = false;
		}
		this.slept = true;
		
		game.setBackground(); 				// Change background
		game.updateStats();
		game.tamagoReact();

	}

	playTamago(){						// Called when user clicks on .play
		// Have xeno have ^^ eyes and dance
		console.log(" <3 ");
		if (game.lightsOff === false){		// If light is on, you can play with Tamago
			if (this.boredom <= 3) {
				this.boredom = 1;
			} else {
				this.boredom -= 3;
			}
			this.played = true;
		}
		game.updateStats();
		game.tamagoReact();

	}

	getsOlder(){						// Called automatically
		// Give xeno a birthday cake
		console.log("Happy Birthday!");
	}

}


/******************************************************************************************
*******************************************************************************************


									GAME OBJECT


Game begins if user enters Tamago name and clicks nameButton
nameButton activates setTimer()
MAKE IT SO THAT the nameButton only starts timer ONCE with boolean!

setTimer only activates if Tamago has a name, i.e. if (xeno.name)
clearTimer should activate when Tamago is dead, i.e. if isDead() === true
We check isDead() at the end of every timer round?


*******************************************************************************************
******************************************************************************************/


const game = {

	/*******************************************************************************************

			Set timer and lightsOff

	*******************************************************************************************/

	timer: 0,								// timer ++ in setInterval();

	lightsOff: false,						// WHILE LIGHTS ARE OFF, TAMAGO CANNOT FEED/PLAY

	xeno: null,

	intervalId: null,


	/*******************************************************************************************

			Define functions that will start and stop timer

	*******************************************************************************************/

	setTimer(){
	    let interval = setInterval(function() {

			// Only do this if Tamago has a name AND if clearTimer === false
			if (game.xeno.name && game.xeno.alive){
				// Check if dead
				if (!game.xeno.isDead()){
						
					// Have a timer to set stats
					// If timer condition AND lights are ON, increase sleepiness
					if (game.timer % 20 === 0){
						game.xeno.age += 1;			// slow speed but medium-strong

					} else if (game.timer % 25 === 0 && game.lightsOff === false){
						game.xeno.sleepiness += 2;			// slow speed but medium-strong

					} else if (game.timer % 12 === 0){		// average speed but medium
						game.xeno.hunger += 1;
					
					} else if (game.timer % 9 === 0){		// fast but little
						game.xeno.boredom += 1;
					}
					
					game.timer += 1;
					console.log(	"Hunger: " 		+ game.xeno.hunger 		+ "\n" + 
									"Sleepiness: " 	+ game.xeno.sleepiness 	+ "\n" +
									"Boredom: " 	+ game.xeno.boredom		+ "\n" +
									"Age: " 		+ game.xeno.age)

					game.updateStats();
					game.tamagoAsks();
					game.morphTamago();

				} else {
					game.clearTimer();
				}
			}

		}, 1000);
	    
	    return interval;
	},


	/****************************** Clear Timer ******************************/

	clearTimer() {
	    clearInterval(this.setTimer);
	},


	/****************************** Name Tamago ******************************/

	nameTamago(name){						// Called when user clicks on nameButton
		console.log("I've got a name!");
		this.xeno.name = name;
	},


	/****************************** Start Game ******************************/

	start() {
		this.xeno = new Tamagotchi(); 		// CREATE new Tamagotchi
		
		const $name = $('input').val(); 	// Get name and store it in $name

		this.nameTamago($name);				// Set name with nameTamago()

		$('#sprite').attr({ src: "images/xeno-normal.gif" });	// Default sprite image on load

		$('.sleepiness span').text("0/10");	//
		$('.hunger span').text("0/10");		// Default Stats at the beginning
		$('.boredom span').text("0/10");	//
		
		this.setTimer();					// Start timer only once (and if name entered)								
	},


	/*******************************************************************************************

							UPDATES ON SCREEN FOR USER

	*******************************************************************************************/

	/******************** Set Background Depending on Lights On/Off ********************/

	setBackground(){
			
		let $background = $('.background');
		let $actBackground = $('#act');

		if (this.lightsOff) {
			$background.css({'background-image': 'url("https://i.imgur.com/Bqjshq6.png")'});
			$actBackground.css({'background-color': '#334357'});
		} else {
			$background.css({'background-image': 'url("https://i.imgur.com/N2Qy7H4.png")'});
			$actBackground.css({'background-color': '#3ba93b'});		
		}
	},


	/**************************** Update Stats on SCREEN ****************************/

	updateStats(){

		// Only update if Tama not dead
		if (!game.xeno.isDead()){

			$('.sleepiness span').text(this.xeno.sleepiness + "/10");
			$('.hunger span').text(this.xeno.hunger + "/10");
			$('.boredom span').text(this.xeno.boredom + "/10");			
			$('.sprite span').text(this.xeno.name + " - lvl: " + this.xeno.age);
		}
	},


	/********************************* Morph Tamago *********************************/

	morphTamago(){

		let $img = $('#sprite');
		
		if (this.xeno.age < 5){
			$img.attr({ src: "images/xeno-normal.gif" })
			$img.css( "opacity", "1" );

		// When Tamago is between age 5-10 normal img
		} else if (this.xeno.age >= 5 && this.xeno.age <= 10){
			$img.attr({ src: "images/xeno-morph1.gif" })

		// When Tamago is age 10+
		} else if (this.xeno.age >= 10) {
			$img.attr({ src: "images/xeno-morph2.gif" })
			
		}
	},


	/********************************* Tamago Asks *********************************/
	/*********** If stats are getting high, Tamago asks for food/bed/play ***********/

	tamagoAsks(){

		// Sad Tamago when hungry/bored/sleepy
		if (this.xeno.hunger >= 6 || this.xeno.boredom >= 6 || this.xeno.sleepiness >= 6){
			$('#sprite').attr({ src: "images/xeno-sad.gif" });
			$('#sprite').css( "opacity", "1" );
		}

		// 
		if (this.xeno.hunger >= 6){
			$('#reaction').attr({ src: "images/bubble-ask-feed.gif" });
			$('#reaction').css({ 
				"opacity" : "1",
				"margin-right" : "-30px" 
			});
			this.xeno.reaction = "hungry";

		} else if (this.xeno.boredom >= 6) {
			$('#reaction').attr({ src: "images/bubble-ask-play.gif" });
			$('#reaction').css({ 
				"opacity" : "1",
				"margin-right" : "-90px" 
			});
			this.xeno.reaction = "bored";

		} else if (this.xeno.sleepiness >= 6){
			$('#reaction').attr({ src: "images/bubble-ask-sleep.gif" });
			$('#reaction').css({ 
				"opacity" : "1",
				"margin-right" : "-220px"
				});
			this.xeno.reaction = "sleepy";

		}

	},


	/********************************* Give Tamago *********************************/

	giveTamago(){



	},
	

	/********************************* React Tamago *********************************/

	tamagoReact(){
		if (this.xeno.fed){

			$('#reaction').attr({ src: "images/bubble-react-heart.gif" })
			$('#reaction').css({ 
				"opacity" : "1",
				"margin-right" : "20px" 
			});
			this.xeno.fed = false;

		} else if (this.xeno.slept){

			$('#reaction').attr({ src: "images/bubble-react-sleep.gif" })
			$('#reaction').css({ 
				"opacity" : "1",
				"margin-right" : "0" 
			});
			this.xeno.slept = false;

		} else if (this.xeno.played){
			$('#reaction').attr({ src: "images/bubble-react-happy.gif" })
			$('#reaction').css({ 
				"opacity" : "1",
				"margin-right" : "30px" 
			});
			this.xeno.played = false;

		}

	}




};



/*******************************************************************************************

		CREATE JQUERY BUTTONS TO REACT ON CLICK

*******************************************************************************************/

// HARD CODE BUTTONS ON SCREEN IN HTML

// Button to name
$('#nameButton').on('click', () => {

	if (game.timer === 0){
		game.start();
	}
});


// Button for food
// When click, call feedTamago()
$('.food').on('click', () => {

	game.xeno.feedTamago();
});


// Button for lights 
// When click, call sleepTamago()
$('.light').on('click', () => {

	game.xeno.sleepTamago();
});


// Button for play
// When click, call playTamago()
$('.play').on('click', () => {

	game.xeno.playTamago();
});


/*******************************************************************************************

		EXTRAS

*******************************************************************************************/

// If other Tamago near (

// When click, call exerciseTamago()


// Age increases every x min
// Morph pet at certain ages
// Animate while alive

//EXTRA 
// Births baby tamago
// Baby tamagos can only turn into Xeno if they play  

// Add special powers
// Add exerciseTamago() method that affects certain properties --> reduce briefly the need for sleep/play --> increase need for food
// Play with other tamago
// Fight with other tamago
// EAT OTHER TAMAGO --> ABSORB POWERS but becomes weakened and easier to die for a little after



































