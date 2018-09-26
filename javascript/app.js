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
		this.age = 0;
		this.alive = true;
	}


	isDead(){
		if (this.hunger > 4 || this.sleepiness > 4 || this.boredom > 4){
			console.log(this.name + " is dead...");
			this.alive = false;
			return true;
		}
	}

	feedTamago(){ 						// Called when user clicks on .food
		// Have xeno eat a burger/person/doughnut
		console.log("Omnomnom");		
		if (game.lightsOff === false){		// If light is on, you can feedTamago
			if (this.hunger <= 5) {
				this.hunger = 1;
			} else {
				this.hunger -= 5;
			}
		}
		game.updateStats();
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
		
		game.setBackground(); 				// Change background
		game.updateStats();

	}

	playTamago(){						// Called when user clicks on .play
		// Have xeno have ^^ eyes and dance
		console.log(" <3 ");
		if (game. 	lightsOff === false){		// If light is on, you can play with Tamago
			if (this.boredom <= 3) {
				this.boredom = 1;
			} else {
				this.boredom -= 3;
			}
		}
		game.updateStats();

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
					if (game.timer % 25 === 0 && game.lightsOff === false){
						game.xeno.sleepiness += 2;			// slow speed but medium-strong
						// $('.sleepiness span').text(game.xeno.sleepiness + "/10");

					} else if (game.timer % 12 === 0){		// average speed but medium
						game.xeno.hunger += 1;
						// $('.hunger span').text(game.xeno.hunger + "/10");
					
					} else if (game.timer % 9 === 0){		// fast but little
						game.xeno.boredom += 1;
						// $('.boredom span').text(game.xeno.boredom + "/10");
					}
					
					game.timer += 1;
					console.log(	"Hunger: " 		+ game.xeno.hunger 		+ "\n" + 
									"Sleepiness: " 	+ game.xeno.sleepiness 	+ "\n" +
									"Boredom: " 	+ game.xeno.boredom);

					game.updateStats();

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
		
		const $name = $('input').val(); 	// Get name

		this.nameTamago($name);				// Set name

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

		$('.sleepiness span').text(this.xeno.sleepiness + "/10");

		$('.hunger span').text(this.xeno.hunger + "/10");

		$('.boredom span').text(this.xeno.boredom + "/10");

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



































