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
		//clear everything
		controlsDiv.style.display = "none";
		screenCounter.innerHTML = "";
		strictCheck.checked = false;
		startBtn.classList.remove("gameOn");
		btns.forEach(btn => btn.removeEventListener('mousedown', shine));
	}
});

strictCheck.addEventListener("change", function() {
	//is strict mode on ?
	if (this.checked) {
		console.log("Strict Mode");
	} else {
		console.log("Strict Mode Off");
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

	//gameOn class will tell us whether the game has started
	if (!startBtn.classList.contains("gameOn")) {
		this.classList.add("gameOn");

		//enable the click event on colored buttons
		btns.forEach(btn => btn.addEventListener('mousedown', shine));
	}

	//else, start button is clicked during the game, reset the game.
	else {
		this.classList.remove("gameOn");
		btns.forEach(btn => btn.removeEventListener('mousedown', shine));
	}
};