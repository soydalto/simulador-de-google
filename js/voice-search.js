const voiceSearch = document.querySelector(".voice-search");
const resultText = document.querySelector(".voice-search__result-text");
const microphoneIcon = document.querySelector('.form__microphone-icon');
const closeModal = document.querySelector(".voice-search__close-modal");
const microphoneBorder = document.querySelector(".voice-search__microphone-border");

let microAceptado = false;
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

if (!('SpeechRecognition' in window)) {
    alert("Qué pena, no puedes usar la API");
}

const voiceSearchModalOpen = () => {
    voiceSearch.style.display = "flex";
    voiceSearch.style.animation = "aparecer 0.5s forwards";
    voiceRecognition();
}

const voiceSearchModalClose = () => {
    voiceSearch.style.animation = "desaparecer 0.25s forwards";
    setTimeout(() => {
        voiceSearch.style.display = "none";
    }, 250);
}

const startRecognition = () => {
    return new Promise((resolve, reject) => {
        const recognition = new window.SpeechRecognition();
        recognition.onresult = (event) => {
            const voiceText = event.results[0][0].transcript;
            resultText.innerHTML = voiceText;
            resolve(voiceText);
        };
        recognition.onerror = (event) => {
            reject(event.error);
        };
        recognition.start();
    });
}

const voiceRecognition = async () => {
    if (!microAceptado) {
        resultText.innerHTML = "Habla ahora";
        try {
            const voiceText = await startRecognition();
            setTimeout(() => {
                window.open(`https://google.com/search?q=${voiceText}`);
            }, 1800);
        } catch (error) {
            console.error("Error de reconocimiento de voz:", error);
        }
    }
}

microphoneIcon.addEventListener("click", voiceSearchModalOpen);
closeModal.addEventListener("click", voiceSearchModalClose);
microphoneBorder.addEventListener("click", voiceRecognition);
