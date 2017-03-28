/* Get the elements */
const btns = document.querySelectorAll(".btn");
const audios = document.querySelectorAll("audio");


/* Event Listeners */
btns.forEach(btn => btn.addEventListener('mousedown', shine));

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

}