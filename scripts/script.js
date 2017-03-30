/*
 *
 * The game
 *
 */

const game = {
	//gameOn is a Boolean telling us whether the game is on
	gameOn: false,

	//array that holds possible values we will randomly choose from
	possible: [0, 1, 2, 3],

	//an array to hold the computer's pattern
	computer: [],

	//an array to hold human's pattern to compare with computer
	human: [],

	//is strict mode on ?
	strict: false
};


/*
 *
 * Get the elements 
 *
 */

const btns = document.querySelectorAll(".btn");
const audios = document.querySelectorAll("audio");
const switchCheck = document.querySelector(".switch input");
const controlsDiv = document.querySelector(".controls");
const screenCounter = document.querySelector("#count");
const strictCheck = document.querySelector("#strict");
const startBtn = document.querySelector("#start");

/*
 *
 * Event Listeners
 *
 */

switchCheck.addEventListener("change", function() {
	//check whether the game's switch is turned on
	if (this.checked) {
		controlsDiv.style.display = "flex";
		screenCounter.innerHTML = "--";
	} else {
		//clear everything, the device is off.
		controlsDiv.style.display = "none";
		screenCounter.innerHTML = "";
		strictCheck.checked = false;
		game.strict = false;
		game.gameOn = false;
		game.computer = [];
		game.human = [];
		btns.forEach(btn => btn.removeEventListener('mousedown', shine));
	}
});

strictCheck.addEventListener("change", function() {
	//is strict mode on ?
	if (this.checked) {
		console.log("Strict Mode");
		game.strict = true;
	} else {
		console.log("Strict Mode Off");
		game.strict = false;
	}
});

startBtn.addEventListener("click", gameStart);

/*
 *
 * Handler Functions
 *
 */

function shine(e) {
	const $this = e.target;
	//get the index of the clicked button
	let index = $this.dataset.index;

	
	//add the animation
	$this.classList.add("shine");
	setTimeout(function() {
		$this.classList.remove("shine");
	}, 1000)

	//play the audio
	const audio = audios[index - 1];
	audio.play();

};

function gameStart() {
	console.log("Game starts");
	game.gameOn = true;

	//gameOn will tell us whether the game has started
	if (game.gameOn){

		//reset everything, game is just starting
		game.computer = [];
		game.human = [];
		game.strict = false;

		//enable the click event on colored buttons
		btns.forEach(btn => btn.addEventListener('mousedown', shine));


		/* Randomly choose from game.possible and
		 * push it to game.computer
		 */	 
		game.computer.push(game.possible[Math.floor(Math.random()*4)]);

		//show the user computer's pattern
		game.computer.forEach(item => {
			console.log(item);
			console.log(btns[item]);

			btns[item].classList.add("shine");
			setTimeout(function() {
				btns[item].classList.remove("shine");
			}, 1000);
		});

		//wait the user's response
		game.human = [3];
		//compare

		let compare = false;
		for (let i=0; i<game.computer.length; i++) {
			compare = (game.computer[i] === game.human[i]);
		}
		console.log(compare);

		//if user got it right, add to the pattern

		//if not, notify and repeat the last pattern (normal mode)

		//if not, notify and start a new game (strict mode)
	}

	//else, start button is clicked during the game, reset the game.
	else {
		game.gameOn = false;

		//start a new game
		gameStart();
	}
};