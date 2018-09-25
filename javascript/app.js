console.log("JS IS RUNNING");

/***************************************************

User will:

• See Tamago move 
• See Tamago's mood shifts
• Interact with Tamago by clicking buttons

IF NO INTERACTION, TAMAGO DIES

***************************************************/

// MAKE TAMAGOTCHI CLASS
// In constructor:
// Name
// Hunger 		==> start at 1
// Sleepiness 	==> start at 1
// Boredom 		==> start at 1
// Age 			==> start at 1

// Methods: 
// feedTamago 	==> Alter Hunger
// sleepTamago 	==> Alter Sleepiness
// playTamago	==> Alter Boredom
// getsOlder 	==> Alter Age

class Tamagotchi {

	constructor(){
		this.name = "";
		this.hunger = 1;
		this.sleepiness = 1;
		this.boredom = 1;
		this.age = 0;
	}
	nameTamago(){
		console.log("I've got a name!");
		//get the value of input
		$('input').on('change', (event) => {
			this.name = $(event.currentTarget).text();
		})
	}

	feedTamago(){ 			// Have xeno eat a burger/person/doughnut
		console.log("Omnomnom");
	}

	sleepTamago(){			// Have xeno close eyes and have zZzzZZZ
		console.log("zzzZZZZ");
	}

	playTamago(){			// Have xeno have ^^ eyes and dance
		console.log(" <3 ");
	}
	getsOlder(){			// Give xeno a birthday cake
		console.log("Happy Birthday!");
	}

}

// Create Tamagotchi
const xeno = new Tamagotchi();
console.log(xeno);


xeno.nameTamago();
console.log(xeno);

// FIRST MAKE GAME OBJECT

const game = {

	// Begin game

	// Have user choose their Tamagotchi name through user input

	// xeno.nameTamago();

	// start interval
	// Increase Hunger, Sleepiness, Boredom at chosen interval

}

// HARD CODE BUTTONS ON SCREEN IN HTML

// Buttons for food
// When click, call feedTamago()

// Button for lights 
// When click, call sleepTamago()

// Button for play
// When click, call playTamago()




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



































