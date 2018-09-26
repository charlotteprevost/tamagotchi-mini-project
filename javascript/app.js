console.log("JS IS RUNNING");


/*******************************************************************************************

User will:

• See Tamago move 
• See Tamago's mood shifts
• Interact with Tamago by clicking buttons

IF NO INTERACTION, TAMAGO DIES

*******************************************************************************************/



/*******************************************************************************************

		Set timer and lightsOff

*******************************************************************************************/

let timer = 0;					// timer ++ in setInterval();
let lightsOff = false;			// WHILE LIGHTS ARE OFF, TAMAGO CANNOT FEED/PLAY

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

	nameTamago(name){					// Called when user clicks on nameButton
		console.log("I've got a name!");
		this.name = name;
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
		if (lightsOff === false){		// If light is on, you can feedTamago
			if (this.hunger <= 5) {
				this.hunger = 1;
			} else {
				this.hunger -= 5;
			}
		}
	}

	sleepTamago(){						// Called when user clicks .light	
		// Have xeno close eyes and have zZzzZZZ
		console.log("zzzZZZZ");
		
		if (lightsOff === false){		// If light is on, you can sleepTamago and turn light off
			this.sleepiness = 0; 		// Reset sleep to zero 
			lightsOff = true;			// WHERE TO CHANGE BACKGROUND?
		} else {
			lightsOff = false;
		}
		
		setBackground(); 				// Change background
	}

	playTamago(){						// Called when user clicks on .play
		// Have xeno have ^^ eyes and dance
		console.log(" <3 ");
		if (lightsOff === false){		// If light is on, you can play with Tamago
			if (this.boredom <= 3) {
				this.boredom = 1;
			} else {
				this.boredom -= 3;
			}
		}
	}

	getsOlder(){						// Called automatically
		// Give xeno a birthday cake
		console.log("Happy Birthday!");
	}

}


// // CREATE TAMAGO
// const makeTamago = () => {
	
const xeno = new Tamagotchi();

// }


/*******************************************************************************************

		DEFINE FUNCTIONS THAT WILL START AND STOP TIMER

*******************************************************************************************/

let IntID = setTimer();

function setTimer(){
    let interval = setInterval(function() {

	// Only do this if Tamago has a name AND if clearTimer === false
	if (xeno.name && xeno.alive){
		// Check if dead
		if (!xeno.isDead()){
				
			// Have a timer to set stats
			// If timer condition AND lights are ON, increase sleepiness
			if (timer % 25 === 0 && lightsOff === false){
				xeno.sleepiness += 2;			// slow speed but medium-strong
			
			} else if (timer % 12 === 0){		// average speed but medium
				xeno.hunger += 1;
			
			} else if (timer % 9 === 0){		// fast but little
				xeno.boredom += 1;
			}
			
			timer += 1;
			console.log(	"Hunger: " + xeno.hunger + "\n" + 
							"Sleepiness: " + xeno.sleepiness + "\n" +
							"Boredom: " + xeno.boredom);
		}

	} else {
		clearTimer();
	}


}, 1000);
     return interval;
}

function clearTimer() {

    clearInterval(IntID);

}


/*******************************************************************************************

		DEFINE FUNCTION TO CHANGE BACKGROUND

*******************************************************************************************/

// Set background depending on lights On/Off
const setBackground = () => {
		
	let $background = $('.background');
	let $actBackground = $('#act');

	if (lightsOff) {
		$background.css({'background-image': 'url("https://i.imgur.com/Bqjshq6.png")'});
		$actBackground.css({'background-color': '#334357'});
	} else {
		$background.css({'background-image': 'url("https://i.imgur.com/N2Qy7H4.png")'});
		$actBackground.css({'background-color': '#3ba93b'});		
	}





}


/*******************************************************************************************
*******************************************************************************************

		GAME OBJECT

*******************************************************************************************
*******************************************************************************************/

const game = {

	// Game begins if user enters Tamago name and clicks nameButton
	// nameButton activates setTimer()
	// setTimer only activates if Tamago has a name, i.e. if (xeno.name)
	// clearTimer should activate when Tamago is dead, i.e. if isDead() === true
	// We check isDead() at the end of every timer round?


};


/*******************************************************************************************

		CREATE JQUERY BUTTONS TO REACT ON CLICK

*******************************************************************************************/

// HARD CODE BUTTONS ON SCREEN IN HTML

// Button to name
$('#nameButton').on('click', () => {

  const $name = $('input').val();

  xeno.nameTamago($name);

  setTimer();							// Start timer when entered name
});


// Button for food
// When click, call feedTamago()
$('.food').on('click', () => {

	xeno.feedTamago();
});


// Button for lights 
// When click, call sleepTamago()
$('.light').on('click', () => {

	xeno.sleepTamago();
});


// Button for play
// When click, call playTamago()
$('.play').on('click', () => {

	xeno.playTamago();
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



































