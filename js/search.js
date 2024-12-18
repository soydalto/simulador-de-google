"use strict";

document.querySelector(".home__form").addEventListener("submit",(event)=>{
	event.preventDefault()
});

document.documentElement.addEventListener("keyup",(evt)=>{
	if (evt.code == 'Enter' && document.activeElement === document.querySelector(".google-search")) {
		let voiceText = document.querySelector(".google-search").value;
		if (voiceText.length > 0) {
            window.location.href = "https://google.com/search?q=" + voiceText;
		}
	}
})

