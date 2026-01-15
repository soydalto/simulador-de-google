const voiceSearch = document.querySelector(".voice-search");
let microAceptado = false;

const voiceSearchModalOpen = () => {
    voiceSearch.style.display = "flex";
    voiceSearch.style.animation = "aparecer 0.5s forwards";
    voiceRecognition();
};

const voiceSearchModalClose = () => {
    voiceSearch.style.animation = "desaparecer 0.25s forwards";
    setTimeout(() => {
        voiceSearch.style.display = "none";
    }, 250);
};

const voiceRecognition = () => {
    if (!microAceptado) {
        window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        if (!("SpeechRecognition" in window)) {
            alert("Que pena, no podes usar la API");
            return;
        }
        microAceptado = true;
    }

    document.querySelector(".voice-search__result-text").innerHTML = "Habla ahora";
    let recognition = new window.SpeechRecognition();

    recognition.onresult = (event) => {
        let voiceText = event.results[0][0].transcript;
        document.querySelector(".voice-search__result-text").innerHTML = voiceText;
        recognition.stop();
        setTimeout(() => {
            const query = encodeURIComponent(voiceText);
            window.open("https://google.com/search?q=" + query, "_blank");
        }, 1800);
    };

    recognition.onerror = (event) => {
        console.error("Error en reconocimiento:", event.error);
    };

    recognition.start();
};

document.querySelector('.form__microphone-icon').addEventListener("click", voiceSearchModalOpen);
document.querySelector(".voice-search__close-modal").addEventListener("click", voiceSearchModalClose);
document.querySelector(".voice-search__microphone-border").addEventListener("click", voiceRecognition);