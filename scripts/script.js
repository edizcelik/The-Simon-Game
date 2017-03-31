/*
 *
 * The game
 *
 */

const game = {
	gameOn: false,
	//array that holds possible values we will randomly choose from
	//possible values corresponds to data-index values of btns
	possible: [0, 1, 2, 3],

	//an array to hold the computer's pattern
	computer: [],

	//an array to hold human's pattern to compare with computer
	human: [],

	//is strict mode on ?
	strict: false,

	//count
	count: 0
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
		game.gameOn = false;
		game.computer = [];
		game.human = [];
		game.strict = false;
		game.count = 0;
		btns.forEach(btn => btn.removeEventListener('click', shine));
	}
});

strictCheck.addEventListener("change", function() {
	//is strict mode on ?
	if (this.checked) {
		game.strict = true;
	} else {
		game.strict = false;
	}
});

startBtn.addEventListener("click", gameStart);

/*
 *
 * Handler Functions
 *
 */

function gameStart() {
	console.log("Game starts");

	//gameOn will tell us whether the game has started
	if (!game.gameOn){

		game.gameOn = true;

		//reset everything, game is just starting
		gameClear();

	}

	//else, start button is clicked during the game, reset the game.
	else {
		game.gameOn = false;

		//start a new game
		gameStart();
	}
};

function gameClear() {
		game.computer = [];
		game.human = [];
		game.count = 0;
		count();
};

function count() {
		game.count++;

		//update the screen with the count number
		if (game.count < 10) {
			screenCounter.innerHTML = `0${game.count}`;
		} else {
			screenCounter.innerHTML = `${game.count}`;
		}

		/*
		 * Randomly choose from game.possible and
		 * push it to game.computer
		 */	 
		pattern();
};

function pattern() {
		game.computer.push(game.possible[Math.floor(Math.random()*4)]);
		console.log(game.computer);
		showPattern();
};

function showPattern() {
		//show the computer's pattern
		let i = 0;

		const interval = setInterval(function() {
			//element index
			const index = game.computer[i];

				//add the shine class to the element
			btns[index].classList.add("shine");
				//play the audio//play the audio
			const audio = audios[index];
			audio.play();

				//remove shine after 0.8s
			setTimeout(function() {
				btns[index].classList.remove("shine");
			}, 300);

			//increment the i to move onto other items in the computer pattern
			i++;

			//clear interval 
			if (i >= game.computer.length) {
				clearInterval(interval);
			}
		}, 600);

		//the user input
		game.human = [];
		user();
};

function user() {

		//enable the click event on colored buttons
		btns.forEach(btn => btn.addEventListener('click', shine));
};

function shine(e) {
		const $this = e.target;
		//get the index of the clicked button
		let index = $this.dataset.index;

			
		//add the animation
		$this.classList.add("shine");
		setTimeout(function() {
			$this.classList.remove("shine");
		}, 300)

		//play the audio
		const audio = audios[index];
		audio.play();

		game.human.push(Number(index));

		//compare the human pattern
		compare();
}

function compare() {
		/* compare */
			console.log(game.human);

			if (game.human[game.human.length - 1] !== game.computer[game.computer.length -1]) {
				console.log("compared different!");

				//if strict mode is on
				if (game.strict) {
					console.log("error: strict mode");
					screenCounter.innerHTML = `!!`;
					screenCounter.classList.add("fadeIn");
					setTimeout(function() {
						screenCounter.classList.remove("fadeIn");
						gameStart();
					}, 2000);
				} else {
					console.log("error: normal mode");
					showPattern();
				}
			} else {
				console.log("Got it right!");

				if (game.human.length === game.computer.length) {
					if (game.count === 20) {
						console.log("You rock!");
					} else {
						count();
					}
				}
			}
		//if user got it right, add to the pattern

		//if not, notify and repeat the last pattern (normal mode)

		//if not, notify and start a new game (strict mode)
}