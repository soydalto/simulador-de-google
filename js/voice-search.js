

// Optimizaciones realizadas:
// 1. Evito repetir selectores usando variables const.
// 2. Mejoro la gestión de SpeechRecognition y la detección de soporte.
// 3. Uso let/const correctamente y limpio el código.
// 4. Agrego comentarios explicativos.

const voiceSearch = document.querySelector(".voice-search");
const resultText = document.querySelector(".voice-search__result-text");
const closeModalBtn = document.querySelector(".voice-search__close-modal");
const micBorder = document.querySelector(".voice-search__microphone-border");
const micIcon = document.querySelector('.form__microphone-icon');

// Abre el modal de búsqueda por voz
const voiceSearchModalOpen = () => {
	voiceSearch.style.display = "flex";
	voiceSearch.style.animation = "aparecer 0.5s forwards";
	voiceRecognition();
};

// Cierra el modal de búsqueda por voz
const voiceSearchModalClose = () => {
	voiceSearch.style.animation = "desaparecer 0.25s forwards";
	setTimeout(() => {
		voiceSearch.style.display = "none";
	}, 250);
};

// Inicia el reconocimiento de voz
const voiceRecognition = () => {
	// Detecta soporte de la API de reconocimiento de voz
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	if (!SpeechRecognition) {
		alert("Que pena, no puedes usar la API de reconocimiento de voz.");
		return;
	}

	resultText.innerHTML = "Habla ahora";
	const recognition = new SpeechRecognition();

	recognition.onresult = (event) => {
		const voiceText = event.results[0][0].transcript;
		resultText.innerHTML = voiceText;
		recognition.stop();
		setTimeout(() => {
			window.open("https://google.com/search?q=" + encodeURIComponent(voiceText));
		}, 1800);
	};

	recognition.start();
};

// Asigno los eventos solo una vez usando las variables optimizadas
micIcon.addEventListener("click", voiceSearchModalOpen);
closeModalBtn.addEventListener("click", voiceSearchModalClose);
micBorder.addEventListener("click", voiceRecognition);