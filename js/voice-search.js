/**
 * Funcionalidad de búsqueda por voz usando la Web Speech API.
 * - Abre un modal para capturar voz del usuario
 * - Transcribe el audio a texto
 * - Realiza una búsqueda en Google con el texto obtenido
 */

// Elementos del DOM
const voiceSearch = document.querySelector(".voice-search");
let microAceptado = false; // Controla si los permisos del micrófono fueron aceptados

/**
 * Abre el modal de búsqueda por voz e inicia el reconocimiento
 */
const voiceSearchModalOpen = () => {
    voiceSearch.style.display = "flex";
    voiceSearch.style.animation = "aparecer 0.5s forwards";
    voiceRecognition();
}

/**
 * Cierra el modal con animación
 */
const voiceSearchModalClose = () => {
    voiceSearch.style.animation = "desaparecer 0.25s forwards";
    setTimeout(() => {
        voiceSearch.style.display = "none";
    }, 250);
}

/**
 * Configura y ejecuta el reconocimiento de voz:
 * - Verifica compatibilidad del navegador
 * - Muestra feedback visual del reconocimiento
 * - Abre resultados de búsqueda
 */
const voiceRecognition = () => {
    if (microAceptado === false) {
        // Polyfill para navegadores WebKit
        window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        
        // Verifica compatibilidad con la API
        if (!('SpeechRecognition' in window)) {
            alert("Lo sentimos, tu navegador no soporta reconocimiento de voz");
        }
    }
    
    document.querySelector(".voice-search__result-text").innerHTML = "Habla ahora";
    let recognition = new window.SpeechRecognition();

    // Maneja el resultado del reconocimiento
    recognition.onresult = (event) => {
        let voiceText = event.results[0][0].transcript;
        document.querySelector(".voice-search__result-text").innerHTML = voiceText;
        recognition.stop();
        
        // Retardo para mostrar feedback antes de redirigir
        setTimeout(() => {
            window.open("https://google.com/search?q=" + voiceText);
        }, 1800);
    }
    
    recognition.start();
}

// Event Listeners
document.querySelector('.form__microphone-icon').addEventListener("click", voiceSearchModalOpen);
document.querySelector(".voice-search__close-modal").addEventListener("click", voiceSearchModalClose);
document.querySelector(".voice-search__microphone-border").addEventListener("click", voiceRecognition);