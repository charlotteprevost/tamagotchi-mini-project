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

	nameTamago(name){		// CALLED when user clicks on nameButton
		console.log("I've got a name!");
		this.name = name;
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


// CREATE TAMAGO
const xeno = new Tamagotchi();


// var intervalID = setInterval(function() { myFunc('one', 'two', 'three'); }, 1000);

// SET INTERVAL 
// Increase Hunger, Sleepiness, Boredom at chosen interval
let interval = setInterval(function() {

	// Only do this if Tamago has a name!
	if (xeno.name){
		// We'll decide later the stats
		xeno.hunger += 1;
		xeno.sleepiness += 1;
		xeno.boredome += 1;
		console.log(xeno.hunger);
	}
}, 2000);			// Do something every 2 seconds



// MAKE GAME OBJECT
const game = {

	// Begin game
	// setInterval()

};




// HARD CODE BUTTONS ON SCREEN IN HTML

// Button to name
$('#nameButton').on('click', () => {

  const $name = $('input').val();

  xeno.nameTamago($name)
});

// Button for food
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



































