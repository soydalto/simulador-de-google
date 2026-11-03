
// Elementos de la página que vamos a usar
const voiceSearch = document.querySelector(".voice-search");
const resultText = document.querySelector(".voice-search__result-text");
const microphoneIcon = document.querySelector(".form__microphone-icon");
const closeButton = document.querySelector(".voice-search__close-modal");
const microphoneButton = document.querySelector(".voice-search__microphone-border");

// Abrir el modal
const voiceSearchModalOpen = () => {
    voiceSearch.style.display = "flex";
    voiceSearch.style.animation = "aparecer 0.5s forwards";
    voiceRecognition();
};

// Cerrar el modal
const voiceSearchModalClose = () => {
    voiceSearch.style.animation = "desaparecer 0.25s forwards";
    setTimeout(() => {
        voiceSearch.style.display = "none";
    }, 250);
};

// Escuchar la voz y buscar en Google
const voiceRecognition = () => {
    // Algunos navegadores usan un nombre distinto para la misma función
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    // Si el navegador no la soporta, avisamos y paramos aquí
    if (!SpeechRecognition) {
        alert("Qué pena, tu navegador no puede usar esta API");
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

// Eventos: qué pasa cuando haces clic
microphoneIcon.addEventListener("click", voiceSearchModalOpen);
closeButton.addEventListener("click", voiceSearchModalClose);
microphoneButton.addEventListener("click", voiceRecognition);