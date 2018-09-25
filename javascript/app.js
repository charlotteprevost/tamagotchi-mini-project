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
		this.timer = 0
	}

	nameTamago(name){			// Called when user clicks on nameButton
		console.log("I've got a name!");
		this.name = name;
	}

	feedTamago(){ 				// Called when user clicks on .food
		// Have xeno eat a burger/person/doughnut
		console.log("Omnomnom");
		this.hunger -= 5;
	}

	sleepTamago(){				// Called when user clicks .light	
		// Have xeno close eyes and have zZzzZZZ
		console.log("zzzZZZZ");
		this.sleepiness = 0; 	// Reset sleep to zero 
	}

	playTamago(){				// Called when user clicks on .play
		// Have xeno have ^^ eyes and dance
		console.log(" <3 ");
		this.boredom -= 3;
	}

	getsOlder(){				// Called automatically
		// Give xeno a birthday cake
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
		
		// Have a timer to set stats
		xeno.timer += 1;

		if (timer % 20 === 0){				// slow speed but medium-strong
			xeno.sleepiness += 2;
		} else if (timer % 14 === 0){		// average speed but medium
			xeno.hunger += 1;
		} else if (timer % 10 === 0){		// fast but little
			xeno.boredom += 1;
		}
		console.log(xeno.hunger);

	}
}, 1000);			// Do something every 2 seconds



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



































